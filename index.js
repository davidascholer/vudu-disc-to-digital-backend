const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
// require('./startup/config')();
// require('./startup/validation')();

// app.get('/', (req, res) => {
//     winston.info('testing')
//     res.send('test!')
//   })

const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

