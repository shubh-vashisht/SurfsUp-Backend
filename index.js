const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
const home = require("./AllRoutes/home");
const eat = require("./AllRoutes/eat");
const stay = require("./AllRoutes/stay");
const sports = require("./AllRoutes/sports");
const cors = require("cors");
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect("mongodb://localhost/surfsup", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb databse called surfsup");
  })
  .catch((err) => {
    console.log("couldnt connect to mongodb", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", home);
app.use("/eat", eat);
app.use("/sports", sports);
app.use("/stay", stay);

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log(`Starting a server at port ${port}`);
});
