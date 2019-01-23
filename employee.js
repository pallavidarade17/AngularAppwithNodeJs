module.exports = function (sequelize, DataTypes) {

  var employees = sequelize.define('employees', {
    code:{
      type: DataTypes.STRING,
      allowNull: false
    },
    name:{
    type:DataTypes.STRING
    },
    gender:{
    type:DataTypes.STRING
    },
    annualSalary:{
    type:DataTypes.INTEGER
    },
    dob:{
    type:DataTypes.STRING
    }
  });

  return employees;
};
