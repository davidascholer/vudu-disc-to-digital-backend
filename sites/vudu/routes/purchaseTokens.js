/*
IDENTIFIERS FOR IN APP PURCHASES FOR BOTH IOS AND ANDROID:
"vdtd_1_2",
"vdtd_3_5",
"vdtd_8_10",
"vdtd_20_20",
"vdtd_60_50",
"vdtd_u_100"
*/
const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const winston = require('winston');

const { User } = require('../database/document/user');

router.post('/', async (req, res) => {

    const ERROR_MSG = 'Could not find user in database.';
    const { appID,purchase } = req.body;
    const purchaseObject = JSON.parse(purchase);
    const { productId } = purchaseObject;
    
    //Search for the user in the database to make sure one doesn't already exist.
    let user = await User.findOne({ appID: String(appID).toLowerCase() });
    if (!user) 
        return res.status(400).send(JSON.stringify(ERROR_MSG));
    
    const newTokenCount = user.tokens + getTokenQuantity(productId);
    
    let transactionDate;
    let prevTransaction;
    let prevTransactionObject;
    let prevTransactionDate;
    if(user.receipts.length > 0 ){
    //Get the purchase time from either android (purchaseTime) or ios (transactionDate)
    transactionDate = (purchaseObject.transactionDate) ? purchaseObject.transactionDate : purchaseObject.purchaseTime;
    prevTransaction = user.receipts[user.receipts.length-1];
    prevTransactionObject = JSON.parse(prevTransaction);
    prevTransactionDate = (prevTransactionObject.transactionDate) ? prevTransactionObject.transactionDate : prevTransactionObject.purchaseTime;
    }

    if (user.receipts.length < 1 || transactionDate > prevTransactionDate) {
        
        await user.updateOne(
            {
                tokens: newTokenCount,
                $push: {
                    receipts: [purchase] 
                }
            }
        );

        res.send({ tokens: newTokenCount, receipts: [...user.receipts, purchase] });

    } else
        res.status(400).send("Duplicate transaction.");
});

const getTokenQuantity = product => {
    switch (product) {
        case "vdtd_1_2": return 1;
            break;
        case "vdtd_3_5": return 3;
            break;
        case "vdtd_8_10": return 8;
            break;
        case "vdtd_20_20": return 20;
            break;
        case "vdtd_60_50": return 60;
            break;
        case "vdtd_u_100": return 15000;
            break;
        default: return 0;
            break;
    }
}

module.exports = router;