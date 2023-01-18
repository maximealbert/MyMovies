const bcrypt = require("bcrypt");
require('dotenv').config();

const database = require('../mymovies_back/database.js')

const connection = database.connection

connection.connect()

module.exports.getallmovies = function(req, res){
    connection.query('SELECT * FROM MyMovies.movies;', (err, rows, field)=>{
        if (err) throw err

        res.json(rows)
    })
}

module.exports.createuser = async function(req, res){

    // Get the data from the request body
    let password = req.body.password
    let mail = req.body.email

    if (password && mail){
        // Hash the password and make the SQL Query
        await bcrypt.genSalt(5, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Refers to the hashed password with 'hash'
                connection.query('INSERT INTO `MyMovies`.`users` (`mail`, `password`) VALUES (?, ?)',[mail, hash],  function (err, results, fields) {
                    res.send(results)
                })

            });
        });

    }
}