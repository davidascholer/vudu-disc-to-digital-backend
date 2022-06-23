const bcrypt = require('bcrypt');
const moment = require('moment');
const express = require('express');
const router = express.Router();

const { getMediaUser } = require('../models/selectUserModule');

router.post('/', async (req, res) => {
    //Get the user from the designated module or null if the user doesn't exist
    const { MediaUser, validate: validateMediaUser } = getMediaUser(req.body.source);

    //Validate
    const { error } = validateMediaUser(req.body);
    if (error) return res.status(400).send(JSON.stringify(error.details[0].message));

    //Check if a user is already in the database.
    let mediaUser = await MediaUser.findOne({ media_id: req.body.media_id });
    if (mediaUser) {
        mediaUser.token = mediaUser.generateAuthToken();
        res.send(JSON.stringify({ 'name':mediaUser.name, 'token' : mediaUser.token, 'data':mediaUser.data}));
    } else {

        //If not, create a new user.
        mediaUser = new MediaUser({
            'media_id': req.body.media_id,
            'name': req.body.name,
            'type': req.body.type,
            'data': {},
            'date': moment.utc(moment())
        })

        await mediaUser.save();

        mediaUser.token = mediaUser.generateAuthToken();

        res.send(JSON.stringify({
            'name': mediaUser.name,
            'data': mediaUser.data,
            'token': mediaUser.token
        }));
    }
});

module.exports = router;
