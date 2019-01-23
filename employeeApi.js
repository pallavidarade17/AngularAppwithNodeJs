// exports.test = function(req, res){
//   console.log("in Test");
//   var employees= [
//       {code:'emp01',name:'Tom',gender:'Male',annualSalary:5500,dob:'05/14/1995'},
//       {code:'emp02',name:'Swapnil',gender:'Male',annualSalary:5500,dob:'05/14/1995'},
//       {code:'emp03',name:'Pratik',gender:'Male',annualSalary:5500,dob:'05/14/1995'},
//       {code:'emp04',name:'Pooja',gender:'Female',annualSalary:5500,dob:'05/14/1995'},
//       {code:'emp05',name:'Pallavi',gender:'Female',annualSalary:5500,dob:'05/14/1995'}
//     ];
//     res.json(employees);
//   // res.send(employees);
// }

// db = require('../../server/models');
//
// module.exports  = function(router)
// {
//
// }
//

var config = require('../../server/config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.db);
var bodyParser = require('body-parser');
db = require('../../server/models');
module.exports = function (router) {

    router.get('/api/v1/employees', function(req, res, next) {
      sequelize.query("Select * from employees", { type: sequelize.QueryTypes.SELECT})
      // db.employees.findAll()
        .then(function(appdata){
          if (appdata) {
            res.status(200).json(appdata);
            }else {
            res.sendStatus(403).send("Not Authorized");
          }
        })
      });

      router.get('/api/v1/employees/:code', function(req, res, next) {
        // console.log(req.params.code);
        var param = req.params.code;
        sequelize.query("Select * from employees where code='"+param+"';", { type: sequelize.QueryTypes.SELECT})
          .then(function(appdata){
            if (appdata) {
              res.status(200).json(appdata[0]);
              }else {
                  res.status(200).json(null);
              // res.sendStatus(403).send("Not Authorized");
            }
          })
        });

      router.post('/api/v1/employeesLazy', function(req, res, next) {
      var app = req.body;
      let pageNo = app.pageNo;
      let pageSize =  app.pageSize
        sequelize.query("Select * from employees ORDER BY id OFFSET "+pageNo+" ROWS FETCH FIRST "+ pageSize+ " ROW ONLY;", { type: sequelize.QueryTypes.SELECT})
        .then(function(catalog) {
            res.send(JSON.stringify(catalog));
        });
        });
}
