const Joi = require("joi");
const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  location: {
    type: String,
    require: true,
  },
  coach: {
    require: true,
    type: String,
  },
});

function validator(body) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(40).required(),
    location: Joi.string().required(),
    coach: Joi.string().required(),
  });
  return schema.validate(body);
}

const sport = mongoose.model("Sport", sportSchema);
exports.Sport = sport;
exports.validate = validator;
