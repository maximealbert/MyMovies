const bcrypt = require("bcrypt");
require('dotenv').config();

const database = require('../database.js')

const connection = database.connection

// Use uuidv4 to generate a token
const { v4: uuidv4 } = require('uuid');



connection.connect()


module.exports.getallmovies = function(req, res){
    connection.query('SELECT * FROM MyMovies.movies;', (err, rows, field)=>{
        if (err) throw err

        res.send(rows)
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


module.exports.login = async function(req, res){

    let mailadress = req.body.email
    let password = req.body.password

    let hashedpasswordfromdb;

    // Get the hashed password from the DB
    connection.query('SELECT * FROM MyMovies.users WHERE mail = ?', [mailadress], async function(err, results, fields){
        if (err) throw err

        console.log("HELLO")

        if (results.length > 0){
            hashedpasswordfromdb = await results[0]["password"]
        }else{
            //res.send("No account matching this mail adress founded")
        }
    })

    // Check if the mail adress isn't empty
    if (mailadress) {

        connection.query('SELECT * FROM MyMovies.users WHERE mail = ?', [mailadress], function(error, results, fields) {

            if (error) throw error;

            if (results.length > 0) {
                console.log("User correctly logged in")

                let resulthash = bcrypt.compare(password, results[0]["password"], async function(err, result){

                    if (result === true){
                        // Good password entered
                        console.log("Good user credentials")

                        // Generate a token
                        const token = uuidv4()

                        res.send({"token" : token})

                    }else{
                        //res.send("Error bad credentials")
                    }
                })
            } else {
               // res.send('Invalid');
            }
            //res.end();
        });
    } else {
        //res.send('Invalid');
       // res.end();
    }

}