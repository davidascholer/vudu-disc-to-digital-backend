const express = require('express');
const router = express.Router();

const { retrieveDataSet } = require('../database/relational/retrieveDataSet');

router.post('/', async (req, res) => {

    const data = await retrieveDataSet(req.body);
    res.send(data);
});

module.exports = router;
