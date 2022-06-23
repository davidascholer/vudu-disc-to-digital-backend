const moment = require('moment');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// const { User } = require('../database/document/user');
const { User, validateUserCreation, validateMediaLogin } = require('../database/document/user');

//Search document database for user.
router.post('/', async (req, res) => {

    const userData = req.body;

    //Media sign ins will never generate an ID as an email address.
    //If email and id are the same, the user is not signing in through media.

    //Form login:
    if (userData.email === userData.appID) {
        const { error } = validateUserCreation(userData);
        if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

        //Search for the user in the database to make sure one doesn't already exist.
        let user = await User.findOne({ appID: String(req.body.appID).toLowerCase() });
        if (user) return res.status(400).send(JSON.stringify('User already registered.'));

        //Create a new user account.
        user = await createNewUser(userData);
        //Salt the password.
        const salt = await bcrypt.genSalt(10);
        //Hash the password.
        user.password = await bcrypt.hash(user.password, salt);
        //Save the user schema.
        await user.save();

        //Create a JWT for authentication.
        user.jwt = user.generateAuthToken();
        //Account creation successful. Send it back!
        res.send(userReturnData(user));

        //Media login:
    } else {
        const { error } = validateMediaLogin(userData);
        if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

        //Search for the user. If found, send back data.
        let user = await User.findOne({ appID: String(req.body.appID).toLowerCase() });
        if (user) {

            //Create a JWT for authentication.
            user.jwt = user.generateAuthToken();
            res.send(userReturnData(user));
        } else {

            /*User not found. Create a new user logging in with media cedentials.*/

            //Create a new user account.
            user = await createNewUser(userData);
            //Save the user schema.
            await user.save();
            //Create a JWT for authentication.
            user.jwt = user.generateAuthToken();
            //Account creation successful. Send it back!
            res.send(userReturnData(user));
        }
    }

});

const createNewUser = async userData => {
    return new User({
        'name': userData.name,
        'email': String(userData.email).toLowerCase(),
        'appID': String(userData.appID).toLowerCase(),
        'password': userData.password,
        'receipts': [],
        'redemptions': [],
        'tokens': 1,
        'date': moment.utc(moment())
    })
}

const userReturnData = (user) => {
    return JSON.stringify({
        'name': user.name,
        'appID':user.appID,
        'tokens': user.tokens,
        'jwt': user.jwt,
        'redemptions': user.redemptions,
    })
}

module.exports = router;
