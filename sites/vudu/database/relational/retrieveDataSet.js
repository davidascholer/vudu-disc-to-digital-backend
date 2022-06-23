/*
    Set up the scheme for retreiving the data from mySQL
*/
const dbConnect = require('../../../../database/db-connect');

const retrieveDataSet = async body => {

    const {searchString, index, indexCount, genre, format, rating, year} = body;
    const ratingStrict = (rating==="") ? "%%" : rating;
    const queryString = `SELECT * FROM vudu_movies WHERE genres LIKE "%${genre}%" && title LIKE "%${searchString}%" && format LIKE "%${format}%" && (ratings LIKE "TV-${ratingStrict}" OR ratings LIKE "${ratingStrict}") && year LIKE "%${year}%" ORDER BY title ASC LIMIT ${index},${indexCount} `;
    try {        
        const response = await dbConnect.query(queryString);
        return response;
    } catch (error) {
        console.log('err',error);
    }

}

exports.retrieveDataSet = retrieveDataSet ;