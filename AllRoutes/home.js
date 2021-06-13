const express = require("express");
const route = express.Router();

route.get("/", function (req, res) {
  res.send(
    "This is the home page!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );
});

module.exports = route;
