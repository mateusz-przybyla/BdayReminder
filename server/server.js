import express from "express";

const app = express();
const port = 8080;

app.get("/api", (req, res) => {
  console.log("Connected to Node");
  //res.send("Hello world!");
  res.json({ fruits: ["apple", "orange", "banana"] });
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
