import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/data", cors(corsOptions), (req, res) => {
  res.json({ list: list });
});

app.post("/api/data", cors(corsOptions), (req, res) => {
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
  console.log(`Server running on port ${port}`);
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
