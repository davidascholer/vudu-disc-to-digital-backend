const express = require('express');
const router = express.Router();

const { User } = require('../database/document/user');

router.post('/', async (req, res) => {

    const ERROR_MSG = 'Could not find user in database.';
    const { appID } = req.body;

    //Search for the user in the database to make sure one doesn't already exist.
    let user = await User.findOne({ appID: String(appID).toLowerCase() });
    if (!user) return res.status(400).send(JSON.stringify(ERROR_MSG));
    
    return res.send(JSON.stringify(user.receipts));

});

module.exports = router;