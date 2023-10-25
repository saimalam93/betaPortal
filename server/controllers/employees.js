require("dotenv").config();
// const mongoose = require("mongoose");
const Employee = require("../models/employee.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

async function viewAllEmployees(_, { filters }) {
  let employees = Employee.find();
  // if (filters.role) {
  //   employees = employees.or({ role: filters.role });
  // }
  return await employees;
}

async function viewSingleEmployee(_, { _id }) {
  return await Employee.findOne({ _id: _id });
}

async function addNewEmployee(_, { employee }) {
  employee._id = new mongoose.Types.ObjectId();
  employee.loginID = await generateLoginID({ employee });

  employee.password = await generateHashPassword(
    employee.fname.substring(0, 1) +
      employee.lname.substring(0, 1) +
      employee.mobile
  );

  if (employee.dateOfJoining == "" || employee.dateOfJoining == null) {
    employee.dateOfJoining = moment().format("YYYY-MM-DD");
  }
  const token = jwt.sign(employee, employee.password);
  employee.token = token;

  return await Employee.create(employee);
}

async function generateLoginID({ employee }) {
  let tailValueInitial = 0;
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

async function generateHashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
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

async function resetPassword(_, { _id }) {
  const employee = await Employee.findOne({ _id: _id });

  employee.password = await generateHashPassword(
    employee.fname.substring(0, 1) +
      employee.lname.substring(0, 1) +
      employee.mobile
  );

  employee.token = "";
  const token = jwt.sign(employee.toJSON(), employee.password);
  employee.token = token;

  const result = await Employee.findOneAndUpdate(
    { _id: employee._id },
    { $set: employee }
  );
  if (result) {
    return true;
  }
  return false;
}

async function updatePassword(_, { employee }) {
  const oldemployee = await Employee.findOne({ loginID: employee.loginID });
  oldemployee.password = await generateHashPassword(employee.password);
  oldemployee.token = "";
  const token = jwt.sign(oldemployee.toJSON(), oldemployee.password);
  oldemployee.token = token;

  const result = await Employee.findOneAndUpdate(
    { _id: oldemployee._id },
    { $set: oldemployee }
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
  resetPassword,
  updatePassword,
};
