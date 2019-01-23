var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
var fs = require('fs');

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'sql'
    },
    port: 8080,
    db: 'postgresql://admin:Pizza123@localhost:5432/TestDB'
  },
  staging: {
    root: rootPath,
    app: {
      name: 'sql'
    },
    port: 8080,
    db: 'postgresql://admin:Pizza123@localhost:5432/TestDB'
  }
};

module.exports = config[env];
