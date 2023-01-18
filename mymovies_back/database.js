const mysql = require('mysql')

module.exports.connection = mysql.createConnection({

    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASENAME

})