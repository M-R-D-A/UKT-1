const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("REQUEST RECEIVED");
  res.send("OK");
});

app.listen(8080, () => {
  console.log("TEST SERVER RUNNING");
});
