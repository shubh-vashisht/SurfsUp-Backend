const Joi = require("joi");
const mongoose = require("mongoose");

const staySchema = new mongoose.Schema({
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
  costPerNight: {
    type: Number,
    require: true,
  },
  stars: {
    type: Number,
    require: true,
    min: 0,
    max: 5,
  },
});

function validator(body) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    location: Joi.string().required(),
    stars: Joi.number().required(),
    costPerNight: Joi.number().required(),
  });
  return schema.validate(body);
}

const stay = mongoose.model("Hotel", staySchema);
exports.Stay = stay;
exports.validate = validator;
