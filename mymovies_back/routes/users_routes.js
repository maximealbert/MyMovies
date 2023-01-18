const express = require('express');
const cors = require("cors");
const app = express()

require('dotenv').config()

module.exports = function(app){

    const controller = require('../controllers/users_controller.js')

    app.route('/')
        .get(controller.getallmovies)

    app.route('/register')
        .post(controller.createuser)

    app.route('/login')
        .post(controller.login)

}