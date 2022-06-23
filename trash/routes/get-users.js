const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { getUser } = require('../models/selectUserModule');

//Search document database for user.
router.post('/', async (req, res) => {

  const { User } = getUser(req.body.source);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

  //invalid email
  let user = await User.findOne({ email: String(req.body.email).toLowerCase() });
  if (!user) return res.status(400).send(JSON.stringify('Invalid email or password.'));

  //invalid password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send(JSON.stringify('Invalid email or password.'));
  
  user.token = user.generateAuthToken();
  res.send(JSON.stringify({
    'name': user.name,
    'data': user.data,
    'token': user.token
  }));
});

//Verify an email address exists for a user.
router.post('/me', async (req, res) => {

  const { User } = getUser(req.body.source);

  let user = await User.findOne({ email: String(req.body.email).toLowerCase() });
  if (!user) return res.status(400).send('User not in database.');

  res.send('Email successfully sent.');

});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    source: Joi.string().min(1).max(31).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
