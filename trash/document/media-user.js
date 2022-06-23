const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const config = require('../../config/environment-variables');

const mediaUserSchema = new mongoose.Schema({
  media_id: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 63
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 63
  },
  type: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 31
  },
  data: {
    type: Object,
    required: false,
  },
  date: {
    type: Date,
  }
});

mediaUserSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id }, config.kuekardPrivateKey);
  return token;
}

const MediaUser = mongoose.model('VuduMediaUser', mediaUserSchema);

function validateMediaUser(mediaUser) {
  const schema = {
    media_id: Joi.string().min(1).max(63).required(),
    name: Joi.string().min(1).max(63).required(),
    type: Joi.string().min(1).max(31).required(),
    source: Joi.string().min(1).max(31).required(),
    date: Joi.string().min(1).max(31),
  };

  return Joi.validate(mediaUser, schema);
}

exports.MediaUser = MediaUser; 
exports.validate = validateMediaUser;