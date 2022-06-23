const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const config = require('../../../../config/environment-variables');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 63
  },
  email: {
    type: String,
    lowercase: true,
    minlength: 5,
    maxlength: 255,
  },
  appID: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1023
  },
  redemptions: {
    type: Array,
    required: true,
  },
  receipts: {
    type: Array,
    required: true,
  },
  tokens: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ appID: this.appID }, "tempauthkey");
  return token;
}

function validateUserCreation(req) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().required().email(),
    appID: Joi.string().required().email(),
    password: Joi.string()
  });

  return schema.validate(req);
}

function validateUserLogin(req) {
  const schema = Joi.object({
    appID: Joi.string().required().email(),
    password: Joi.string()
  });

  return schema.validate(req);
}

function validateMediaLogin(req) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).allow(null),
    email: Joi.string().email().allow(null),
    appID: Joi.string(),
    password: Joi.string().allow(null)
  });

  return schema.validate(req);
}

const User = mongoose.model('VuduUser', userSchema);

exports.User = User;
exports.validateUserLogin = validateUserLogin;
exports.validateMediaLogin = validateMediaLogin;
exports.validateUserCreation = validateUserCreation;