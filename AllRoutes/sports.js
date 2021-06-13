const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Sport, validate } = require("../Models/sports.js");

router.get("/", async (req, res) => {
  const ab = await Sport.find().sort("name");
  res.send(ab);
});

router.get("/:id", async (req, res) => {
  const sport = await Sport.findById(req.params.id);
  if (!sport)
    return res
      .status(404)
      .send("The sport adventure with the given id was not found");
  res.send(sport);
});

router.delete("/:id", async (req, res) => {
  const sport = await Sport.findByIdAndRemove(req.params.id);

  if (!sport)
    return res
      .status(404)
      .send("The sport adventure with the given id was not found");

  res.send(sport);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const sport = await Sport.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      location: req.body.location,
      coach: req.body.coach,
    },
    { new: true }
  );

  if (!sport)
    return res
      .status(404)
      .send("The sport adventure with the given ID was not found.");

  res.send(sport);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const sport = new Sport({
      title: req.body.title,
      location: req.body.location,
      coach: req.body.coach,
    });
    await sport.save();
    res.send(sport);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
