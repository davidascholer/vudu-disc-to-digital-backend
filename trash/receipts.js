const express = require('express');
const router = express.Router();

const { User } = require('../sites/vudu/database/document/user');

router.post('/', async (req, res) => {

    const ERROR_MSG = 'An unknown error has occurred.';
    const { appID, count } = req.body;

    //Search for the user in the database to make sure one doesn't already exist.
    let user = await User.updateOne({
        appID: String(appID).toLowerCase()
    },
    { $set: { tokens: count } },
    (err, res) => {
        if (err)
        console.error('error: ', err);
        }
    );
    
    if (!user) return res.status(400).send(JSON.stringify(ERROR_MSG));

});


module.exports = router;