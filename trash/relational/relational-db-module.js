/*
    Set up the scheme for retreiving the data from mySQL
*/
const dbConnect = require('../../../database/db-connect');

const retrieveDataSet = async body => {

    const {searchString, index, indexCount, genre, format, rating, year} = body;
    // console.log(JSON.stringify(body));
    //Retrieve data from database
    const ratingStrict = (rating==="") ? "%%" : rating;
    const queryString = `SELECT * FROM vudu_movies WHERE genres LIKE "%${genre}%" && title LIKE "%${searchString}%" && format LIKE "%${format}%" && (ratings LIKE "TV-${ratingStrict}" OR ratings LIKE "${ratingStrict}") && year LIKE "%${year}%" ORDER BY title ASC LIMIT ${index},${indexCount} `;
    // console.log('query: '+queryString);
    // console.log('searchString: '+searchString);
    // console.log('index: '+index);
    // console.log('indexCount: '+indexCount);
    // console.log('genre: '+genre);
    // console.log('format: '+format);
    // console.log('rating: '+rating);
    // console.log('year: '+year);
    try {        
        const response = await dbConnect.query(queryString);
        return response;
    } catch (error) {
        console.log('err',error);
    }

}

exports.retrieveDataSet = retrieveDataSet ;