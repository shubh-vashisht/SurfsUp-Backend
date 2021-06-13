const Joi = require("joi");
const mongoose = require("mongoose");

const eatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  location: {
    type: String,
    require: true,
  },
  rating: {
    require: true,
    type: Number,
    min: 1,
    max: 5,
  },
  cuisine: {
    type: String,
    require: true,
  },
  costfortwo: {
    type: Number,
    min: 10,
    require: true,
  },
});

function validator(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    location: Joi.string().required(),
    costfortwo: Joi.number().required(),
    rating: Joi.number().min(1).max(5).required(),
    cuisine: Joi.string().required(),
  });
  return schema.validate(body);
}

const Eat = mongoose.model("Eat", eatSchema);
exports.Eat = Eat;
exports.validate = validator;
