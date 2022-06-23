const express = require('express');
const router = express.Router();
const winston = require('winston');

const { User } = require('../database/document/user');

router.post('/', async (req, res) => {

    const ERROR_MSG = 'An unknown error has occurred.';
    const { appID, upc } = req.body;

    //Search for the user in the database to make sure one doesn't already exist.
    let user = await User.findOne({ appID: String(appID).toLowerCase() });
    if (!user) return res.status(400).send(JSON.stringify(ERROR_MSG));

    if (user.tokens > 0) {
        const newTokenCount = user.tokens - 1;

        await user.updateOne(
            {
                tokens: newTokenCount,
                $push: {
                    redemptions: upc
                }
            }
        );

        res.send({ tokens: newTokenCount, redemptions: [...user.redemptions,upc] });
    }
    else
        res.status(400).send("Not enough token credits available.")

});

module.exports = router;