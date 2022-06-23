const moment = require('moment');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// const { User } = require('../database/document/user');
const { User, validateUserLogin } = require('../database/document/user');

//Search document database for user.
router.post('/', async (req, res) => {

    const userData = req.body;
    const ERROR_MSG = 'Incorrect email or password.';
    const { error } = validateUserLogin(userData);
    if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

    //Search for the user in the database to make sure one doesn't already exist.
    let user = await User.findOne({ appID: String(req.body.appID).toLowerCase() });
    if (!user) return res.status(400).send(JSON.stringify(ERROR_MSG));

    //Validate password.
    const validPassword = await bcrypt.compare(userData.password, user.password);
    if (!validPassword) return res.status(400).send(JSON.stringify(ERROR_MSG));

    //Create a JWT for authentication.
    user.jwt = user.generateAuthToken();
    //Account creation successful. Send it back!
    res.send(JSON.stringify({
        'name': user.name,
        'appID':user.appID,
        'tokens': user.tokens,
        'jwt': user.jwt,
        'redemptions': user.redemptions,
        'message': "Account found."
    }))
});

// //Verify an email address exists for a user.
// router.post('/me', async (req, res) => {

//   const { User } = getUser(req.body.source);

//   let user = await User.findOne({ email: String(req.body.email).toLowerCase() });
//   if (!user) return res.status(400).send('User not in database.');

//   res.send('Email successfully sent.');

// });

module.exports = router;
