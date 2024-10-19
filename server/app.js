import express from "express";

const app = express();
const port = 4000;
/*
app.get("/", (req, res) => {
  console.log("Connected to Node");
  res.send("Hello world!");
});
*/
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
