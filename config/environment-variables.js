require('dotenv').config();

module.exports = {
    kuekardPrivateKey: process.env.KUEKARD_PRIVATE_KEY,
    googleApiCredentials : JSON.parse(process.env.GOOGLE_API_CREDENTIALS)
}