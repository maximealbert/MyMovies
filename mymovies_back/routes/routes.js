const express = require('express');
const cors = require("cors");
const app = express()

require('dotenv').config()

module.exports = function(app){

    const controller = require('../controller.js')

    app.route('/')
        .get(controller.getallmovies)

    app.route('/register')
        .post(controller.createuser)

}