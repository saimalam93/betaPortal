require("dotenv").config();
const Employee = require("../models/employee.js");
const jwt = require("jsonwebtoken");
var moment = require("moment");

async function viewAllEmployees(_, filters) {
  let employees = Employee.find();
  if (filters.title) {
    employees = employees.or({ title: filters.title });
  }
  if (filters.department) {
    employees = employees.or({ department: filters.department });
  }
  if (filters.employeeType) {
    employees = employees.or({ employeeType: filters.employeeType });
  }
  return await employees;
}

async function viewSingleEmployee(_, { _id }) {
  return await Employee.findOne({ _id: _id });
}

async function addNewEmployee(_, { employee }) {
  // console.log(employee);
  employee.loginID = await generateLoginID({ employee });

  employee.password =
    employee.fname.substring(0, 1) +
    employee.lname.substring(0, 1) +
    employee.mobile;

  if (employee.dateOfJoining == "" || employee.dateOfJoining == null) {
    employee.dateOfJoining = moment().format("YYYY-MM-DD");
  }
  const token = jwt.sign(employee, process.env.ACCESS_TOKEN_SECRET);
  employee.token = token;

  return await Employee.create(employee);
}

async function generateLoginID({ employee }) {
  let tailValueInitial = 0;
  // str.charAt(0).toUpperCase() + str.slice(1);
  const employeeRole = await Employee.find({ role: employee.role });
  if (employee.role == "Director") {
    tailValueInitial = 10000;
  } else if (employee.role == "Admin") {
    tailValueInitial = 20000;
  } else if (employee.role == "Manager") {
    tailValueInitial = 30000;
  } else if (employee.role == "Employee") {
    tailValueInitial = 40000;
  }
  return (
    employee.role.substring(0, 3).toUpperCase() +
    (tailValueInitial + employeeRole.length + 1).toString()
  );
}

async function updateEmployee(_, { employee }) {
  const result = await Employee.findOneAndUpdate(
    { _id: employee._id },
    { $set: employee }
  );
  if (result) {
    return true;
  }
  return false;
}

async function deleteEmployee(_, { _id }) {
  const result = await Employee.findOneAndDelete({ _id: _id });
  if (result) {
    return true;
  }
  return false;
}

module.exports = {
  viewAllEmployees,
  viewSingleEmployee,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
};
