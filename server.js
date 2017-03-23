
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var http = require('http');

// Config bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Make app show access logs
app.use(morgan('dev'));

// Set port
var port = 9000;

// Config view location and engine
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Set static route
app.use('/public', express.static(path.join(__dirname, 'app/public')));
// Set bower route
app.use('/components', express.static(path.join(__dirname, 'bower_components')));
// Set NPM route
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Set up DB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://todoDev:360noscope@localhost:27017/todo");

// Set app's routes
var router = express.Router();

// Set view route
var viewRoute = require('./app/routes/view');
router.use("/", viewRoute);

// Set api route
var apiRoute = require('./app/routes/api');
router.use("/api", apiRoute);

// Config app's router
app.use(router);

// Start server
var server = http.createServer(app);
server.listen(port);
console.log("app : TodoList \nrunning on port: " + port);
