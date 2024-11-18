import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

//Password-related imports
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 8080;
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};
const saltRounds = 10;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "TOPSECRET",
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
  user: "postgres",
  host: "localhost",
  database: "bday-reminder",
  password: "",
  port: 5432,
});
db.connect();

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

app.post("/api/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);

    if (checkResult.rows.length > 0) {
      res.json({ error: "Email already exists. Try logging in." });
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
    console.log(err);
  }
});

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
      console.log(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

/*
//Basic auth with username and password

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;

      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            res.json({ user: user});
          } else {
            res.json({ error: "Invalid email or password." });
          }
        }
      });
    } else {
      res.json({ error: "Invalid email or password." });
    }
  } catch (err) {
    console.log(err);
  }
});
*/

// -- Birthdays Section API --

app.get("/api/data", (req, res) => {
  res.json({ list: list });
});

app.post("/api/data", (req, res) => {
  console.log(req.body);

  const newItem = {
    id: list.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    comment: req.body.comment,
  };

  list.push(newItem);
  res.json(newItem);
});

app.patch("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingItem = list.find((item) => id === item.id);

  const replacementItem = {
    id: id,
    firstName: req.body.firstName || existingItem.firstName,
    lastName: req.body.lastName || existingItem.lastName,
    birthdate: req.body.birthdate || existingItem.birthdate,
    comment: req.body.comment || existingItem.comment,
  };

  const searchIndex = list.findIndex((item) => id === item.id);
  list[searchIndex] = replacementItem;

  console.log(list[searchIndex]);
  res.json(replacementItem);
});

app.delete("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = list.findIndex((item) => item.id === id);

  if (searchIndex > -1) {
    list.splice(searchIndex, 1);
    res.sendStatus(200);
  } else {
    res.status(404).json({
      error: `Person with id: ${id} not found.`,
    });
  }
});

app.listen(port, () => {
  console.log(`API Server running on port ${port}`);
});

var list = [
  {
    id: 1,
    firstName: "mateusz",
    lastName: "przybyla",
    birthdate: "1994-01-01",
    comment: "aaa",
  },
  {
    id: 2,
    firstName: "paulina",
    lastName: "przybyla",
    birthdate: "1994-01-02",
    comment: "bbb",
  },
  {
    id: 3,
    firstName: "ania",
    lastName: "przybyla",
    birthdate: "1994-03-03",
    comment: "ccc",
  },
  {
    id: 4,
    firstName: "ania",
    lastName: "przybyla",
    birthdate: "1994-04-03",
    comment: "ccc",
  },
  {
    id: 5,
    firstName: "ania",
    lastName: "przybyla",
    birthdate: "1994-05-03",
    comment: "ccc",
  },
  {
    id: 6,
    firstName: "ania",
    lastName: "przybyla",
    birthdate: "1994-06-03",
    comment: "ccc",
  },
  {
    id: 7,
    firstName: "ania",
    lastName: "przybyla",
    birthdate: "1994-07-03",
    comment: "ccc",
  },
];
