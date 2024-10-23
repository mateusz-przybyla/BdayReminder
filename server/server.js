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
  res.json({ birthdays: birthdays });
});

app.post("/api/data", cors(corsOptions), (req, res) => {
  console.log(req.body);
  const newPerson = {
    id: birthdays.length + 1,
    person: req.body.person,
  };

  birthdays.push(newPerson);
});

app.delete("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = birthdays.findIndex((birthday) => birthday.id === id);

  if (searchIndex > -1) {
    birthdays.splice(searchIndex, 1);
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

var birthdays = [
  {
    id: 1,
    person: "mateusz",
  },
  {
    id: 2,
    person: "paulina",
  },
  {
    id: 3,
    person: "ania",
  },
];
