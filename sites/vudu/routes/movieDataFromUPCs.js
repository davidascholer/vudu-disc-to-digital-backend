const express = require('express');
const router = express.Router();

const { retrieveDataFromUPCs } = require('../database/relational/retrieveDataFromUPCs');

router.post('/', async (req, res) => {

    const data = await retrieveDataFromUPCs(req.body);
    res.send(data);
});

module.exports = router;
