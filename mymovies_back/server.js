const express = require('express')
const app = express()
const cors = require('cors')
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const usersroutes = require('./routes/users_routes.js');
usersroutes(app);



app.listen(process.env.PORT, () => {
    console.log('Server is running on: http://localhost:' + process.env.PORT+'/');
});