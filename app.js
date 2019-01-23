var express= require('express');
var bodyParser= require('body-parser');
var cookieParser = require('cookie-parser');
var http = require('http');
var https = require('https');
var config = require('./server/config');

var Sequelize = require('sequelize');
var request = require('request');
console.log(process.env.NODE_ENV);
var sequelize = new Sequelize(config.db);
var db = require('./server/models');
// const sequelize = new Sequelize('TestDB', 'admin', 'Pizza123', {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })


var appPort = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var server = app.listen(appPort, function () {
  var host = server.address().address;
  var port = server.address().port;
	console.log ('Server Started at ' + appPort);
});
// set our port
app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};

app.use(bodyParser.json({limit: '100mb', extended: true, parameterLimit:500000}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit:500000}));
app.use(cookieParser());
app.use(allowCrossDomain);

var secure = require('./routes/secure')
app.use('/secure', secure)

sequelize
  .sync()
  .then(function () {
	  }).catch(function (e) {
			console.log('### sequelize sync error ###');
			console.log(e);
  });

module.exports = app;
