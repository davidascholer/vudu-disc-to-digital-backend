const mysql = require('mysql');

const dbConfig = require('./db-config').getDBConfig();

var connection;

// Connection implicitly established w connection.query().
const query = queryString => {

    connection = mysql.createConnection(dbConfig);

    return new Promise( (resolve,reject) =>{

        connection.query(queryString, (error, results) => {
            if (error) {
                connection.end();
                console.log('error in query',error);
                reject('error');
            }
            resolve(results);
        });
        
        connection.end();
    })
};

module.exports.query = query;
