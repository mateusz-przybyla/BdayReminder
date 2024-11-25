import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import env from "dotenv";
import { check, validationResult } from "express-validator";

//password-related imports
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = process.env.API_PORT || 8080;

env.config({ path: "../.env" });

//conditional statement to enable CORS based on the environment
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.LOCAL_CLIENT_BASE_URL
        : process.env.REMOTE_CLIENT_BASE_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

const saltRounds = 10;

// -- Authentication Section API --

app.get("/api/sessions", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated." });
  }
});

app.delete("/api/sessions", (req, res) => {
  req.logout(() => {
    res.end();
  });
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user.id, req.user.username);
  res.status(201).json(req.user);
});

app.post(
  "/api/register",
  [check("username").isEmail(), check("password").isLength({ min: 3 })],
  async (req, res) => {
    //backend data validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({
        error: "The entered data did not pass validation. Enter correct data.",
      });
    }

    const username = req.body.username;
    const password = req.body.password;

    try {
      const checkResult = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [username]
      );

      if (checkResult.rows.length > 0) {
        res
          .status(403)
          .json({ error: "Email already exists. Try logging in." });
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          } else {
            const result = await db.query(
              "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
              [username, hash]
            );
            const user = {
              id: result.rows[0].id,
              username: result.rows[0].email,
            };
            req.login(user, (err) => {
              console.log("success");
              res.status(201).json(user);
            });
          }
        });
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  }
);

// Passport: set up localy strategy
passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const storedHashedPassword = result.rows[0].password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              const user = {
                id: result.rows[0].id,
                username: result.rows[0].email,
              };
              console.log(user);
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb(null, false);
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// -- Birthdays Section API --

app.get("/api/data", async (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);

    try {
      const result = await db.query(
        "SELECT id, first_name, last_name, TO_CHAR(birthdate, 'yyyy-mm-dd') AS birthdate, comment FROM birthdays WHERE user_id = $1 ORDER BY birthdate ASC",
        [req.user.id]
      );
      console.log(result.rows);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(200).json([]);
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  } else {
    res.status(401).json({ error: "Not authenticated." });
  }
});

app.post(
  "/api/data",
  [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("birthdate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  ],
  async (req, res) => {
    if (req.isAuthenticated()) {
      console.log(req.user);

      //backend data validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({
          error:
            "The entered data did not pass validation. Enter correct data.",
        });
      }

      try {
        const result = await db.query(
          "INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, TO_CHAR(birthdate, 'yyyy-mm-dd') AS birthdate, comment",
          [
            req.body.firstName,
            req.body.lastName,
            req.body.birthdate,
            req.body.comment,
            req.user.id,
          ]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.log(`ERROR: ${err.message}`);
        res.status(503).json({ error: "Impossible to create the birthday." });
      }
    } else {
      res.status(401).json({ error: "Not authenticated." });
    }
  }
);

app.put(
  "/api/data/:id",
  [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("birthdate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  ],
  async (req, res) => {
    if (req.isAuthenticated()) {
      console.log(req.user);

      //backend data validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({
          error:
            "The entered data did not pass validation. Enter correct data.",
        });
      }

      const id = parseInt(req.params.id);

      try {
        const result = await db.query(
          "UPDATE birthdays SET first_name = $1, last_name = $2, birthdate = $3, comment = $4, user_id = $5 WHERE birthdays.id = $6 RETURNING id, first_name, last_name, TO_CHAR(birthdate, 'yyyy-mm-dd') AS birthdate, comment",
          [
            req.body.firstName,
            req.body.lastName,
            req.body.birthdate,
            req.body.comment,
            req.user.id,
            id,
          ]
        );
        res.status(200).json(result.rows[0]);
      } catch (err) {
        console.log(`ERROR: ${err.message}`);
        res.status(503).json({ error: "Impossible to update the birthday." });
      }
    } else {
      res.status(401).json({ error: "Not authenticated." });
    }
  }
);

app.delete("/api/data/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);

    const id = parseInt(req.params.id);
    try {
      await db.query("DELETE FROM birthdays WHERE birthdays.id = $1", [id]);
      res.status(200).end();
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      res.status(503).json({ error: "Impossible to delete the birthday." });
    }
  } else {
    res.status(401).json({ error: "Not authenticated." });
  }
});

app.listen(port, () => {
  console.log(`API Server running on port ${port}`);
});
