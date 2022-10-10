const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  loginID: String,
  password: String,
  fname: String,
  lname: String,
  mobile: String,
  role: String,
  email: String,
  gender: String,
  address: String,
  emergencyContact: String,
  employeeType: String,
  department: String,
  sin: String,
  token: String,

  currentStatus: { type: String, default: "null" },

  dateOfBirth: { type: Date },
  dateOfJoining: { type: Date, default: new Date() },
});

const Employee = mongoose.model("Employee", EmployeeSchema, "employees");
module.exports = Employee;
