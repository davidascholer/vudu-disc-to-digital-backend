const bcrypt = require('bcrypt');
const moment = require('moment');
const express = require('express');
const router = express.Router();

const { getUser } = require('../models/selectUserModule');

//Create user in document database.
router.post('/', async (req, res) => {
  
  //Send us back the correct module for this endpoint.
  const { User, validate: validateUser } = getUser(req.body.source);

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

  //Search for the user in the database to make sure one doesn't already exist.
  let user = await User.findOne({ email: String(req.body.email).toLowerCase() });
  if (user) return res.status(400).send(JSON.stringify('User already registered.'));

  //Create a new user schema.
  user = new User({
    'name': req.body.name,
    'email': String(req.body.email).toLowerCase(),
    'password': req.body.password,
    'data':{},
    'date': moment.utc(moment())
  })
  //Salt the password.
  const salt = await bcrypt.genSalt(10);
  //Hash the password.
  user.password = await bcrypt.hash(user.password, salt);
  //Save the user schema.
  await user.save();
  //Create a JWT for authentication.
  user.token = user.generateAuthToken();
  res.send(JSON.stringify({
    'name': user.name,
    'data': user.data,
    'token': user.token
  }));
});

module.exports = router;
