const express = require('express');
const router = express.Router();
const winston = require('winston');

try {
    router.get('/', async (req, res) => {
        res.send("worksss");
    });
    
} catch (error) {
    winston.info('nope')
 
}

module.exports = router; 
