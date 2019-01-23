var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  config = require('../config'),
  db = {};

var sequelize = new Sequelize(config.db);

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;

});

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
    try {
      db[modelName].comments(sequelize);
    }
    catch(e){}//Some tables may not have comments, ignore if error.
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
