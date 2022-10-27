const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

// set port
const port = process.env.PORT;

// init app
const app = express();

// view engine
app.set('view engine', 'ejs');
// public folder
app.use(express.static(__dirname + '/public'));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// routes
app.use('/', require('./routes/dashboard.routes'))
app.use('/generate', require('./routes/generate.routes'))

// start server
app.listen(process.env.PORT || port, () => {
    console.log(`[+] Start server on port ${port}`)
});
