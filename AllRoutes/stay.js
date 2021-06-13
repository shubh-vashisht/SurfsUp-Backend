const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Stay, validate } = require("../Models/stay.js");

router.get("/", async (req, res) => {
  const ab = await Stay.find().sort("name");
  res.send(ab);
});

router.get("/:id", async (req, res) => {
  const stay = await Stay.findById(req.params.id);
  if (!stay)
    return res.status(404).send("The Hotel with the given id was not found");
  res.send(stay);
});

router.delete("/:id", async (req, res) => {
  const stay = await Stay.findByIdAndRemove(req.params.id);

  if (!stay)
    return res.status(404).send("The Hotel with the given id was not found");

  res.send(stay);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const stay = await Stay.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      location: req.body.location,
      stars: req.body.stars,
      costPerNight: req.body.costPerNight,
    },
    { new: true }
  );

  if (!stay)
    return res.status(404).send("The Hotel with the given ID was not found.");

  res.send(stay);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const stay = new Stay({
      name: req.body.name,
      location: req.body.location,
      stars: req.body.stars,
      costPerNight: req.body.costPerNight,
    });
    await stay.save();
    res.send(stay);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
