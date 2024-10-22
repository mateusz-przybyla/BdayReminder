import express from "express";
import cors from "cors";

const app = express();
const port = 8080;
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

var fruits = ["apple", "orange", "banana"];

app.get("/api/data", cors(corsOptions), (req, res) => {
  console.log("Connected to Node");
  res.json({ fruits: fruits });
});

app.post("/api/data", (req, res) => {
  console.log("Connected to React");
  fruits.push("strawberry");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
