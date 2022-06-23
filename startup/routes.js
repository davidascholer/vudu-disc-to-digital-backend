const express = require('express');
const cors = require('cors');

// const auth = require('../middleware/auth');
// const createUsers = require('../routes/create-users');
// const getCreateMediaUsers = require('../routes/get-create-media-users');
// const getUsers = require('../routes/get-users');

const vuduData = require('../sites/vudu/routes/data');
const vuduMovieDataFromUPCs = require('../sites/vudu/routes/movieDataFromUPCs');
const vuduVerifyToken = require('../sites/vudu/routes/verifyToken');
const vuduReceipts = require('../sites/vudu/routes/getReceipts');
const vuduRedeemToken = require('../sites/vudu/routes/redeemToken');
const vuduPurchaseTokens = require('../sites/vudu/routes/purchaseTokens');
const vuduCreateAccount = require('../sites/vudu/routes/createAccount');
const vuduGetAccount = require('../sites/vudu/routes/getAccount');
const vuduAppleLogin = require('../sites/vudu/routes/appleLogin');
const error = require('../middleware/error');

const corsOptions = {
  origin: '*',//'http://localhost:3000',
}

module.exports = function(app) {
  app.use(express.json());
  // app.use('/api/get-create-media-users', cors(corsOptions), getCreateMediaUsers);
  // app.use('/api/create-users', cors(corsOptions), createUsers);
  // app.use('/api/get-users', cors(corsOptions), getUsers);
  app.use('/vudu/api/data', cors(corsOptions), vuduData);
  app.use('/vudu/api/movie_data_from_upcs', cors(corsOptions), vuduMovieDataFromUPCs);
  app.use('/vudu/api/verify_token', cors(corsOptions), vuduVerifyToken);
  app.use('/vudu/api/create_account', cors(corsOptions), vuduCreateAccount);
  app.use('/vudu/api/get_account', cors(corsOptions), vuduGetAccount);
  app.use('/vudu/api/receipts', cors(corsOptions), vuduReceipts); 
  app.use('/vudu/api/redeem_token', cors(corsOptions), vuduRedeemToken);
  app.use('/vudu/api/purchase_tokens', cors(corsOptions), vuduPurchaseTokens);
  app.use('/vudu/api/applelogin', cors(corsOptions), vuduAppleLogin);
  app.use(error);
}
 