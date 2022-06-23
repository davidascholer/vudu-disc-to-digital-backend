const express = require('express');
const router = express.Router();

const { retrieveDataSet } = require('../relational/relational-db-module');

router.post('/', async (req, res) => {

    const data = await retrieveDataSet(req.body);
    res.send(JSON.stringify(data)); 
});

module.exports = router;
