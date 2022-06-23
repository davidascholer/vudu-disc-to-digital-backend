/*
    Set up the scheme for retreiving the data from mySQL
*/
const dbConnect = require('../../../../database/db-connect');

const retrieveDataFromUPCs = async body => {

    const {movieUPCs} = body;
    const movieUPCString = movieUPCs.join("' OR upc LIKE '")
    const queryString = `SELECT * FROM vudu_movies WHERE upc LIKE '${movieUPCString}'`;
    try {        
        const response = await dbConnect.query(queryString);
        return response;
    } catch (error) {
        console.log('err',error);
    }

}

exports.retrieveDataFromUPCs = retrieveDataFromUPCs ;