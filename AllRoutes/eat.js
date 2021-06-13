const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Eat, validate } = require("../Models/eat");

router.get("/", async (req, res) => {
  const ab = await Eat.find().sort("name");
  res.send(ab);
});

router.get("/:id", async (req, res) => {
  const eat = await Eat.findById(req.params.id);
  if (!eat)
    return res.status(404).send("The eatery with the given id was not found");
  res.send(eat);
});

router.delete("/:id", async (req, res) => {
  const eat = await Eat.findByIdAndRemove(req.params.id);

  if (!eat)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(eat);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const eat = await Eat.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      location: req.body.location,
      rating: req.body.rating,
      cuisine: req.body.cuisine,
      costfortwo: req.body.costfortwo,
    },
    { new: true }
  );

  if (!eat)
    return res.status(404).send("The eatery with the given ID was not found.");

  res.send(eat);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const eat = new Eat({
      name: req.body.name,
      location: req.body.location,
      rating: req.body.rating,
      cuisine: req.body.cuisine,
      costfortwo: req.body.costfortwo,
    });
    await eat.save();
    res.send(eat);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
