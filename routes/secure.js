var express= require('express');
var path = require('path');
var router = express.Router();
var session = require('express-session');
var config = require('../server/config');

var app = express();
router.get('/', function (req, res, next) {
  res.send("In Secure JS")
});

require('./api/employeesApi')(router);
// var employees = require('./api/employeesApi');
// router.get('/employees', employees.test);

module.exports = router;
