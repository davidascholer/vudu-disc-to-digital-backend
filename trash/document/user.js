const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const config = require('../../config/environment-variables');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 63
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1023
  },
  data: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
  }
});``

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id }, config.kuekardPrivateKey);
  return token;
}

const User = mongoose.model('VuduUser', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(1).max(63).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1023).required(),
    source: Joi.string().min(1).max(31).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;