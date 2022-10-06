const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  loginID: String,
  password: String,
  fname: String,
  lname: String,
  gender: String,
  address: String,
  mobile: String,
  emergencyContact: String,
  email: String,
  role: String,
  employeeType: String,
  sin: String,

  skills: [String],
  dateOfBirth: { type: Date },
  dateOfJoining: { type: Date, default: new Date() },
  currentStatus: { type: String, default: "null" },
});

const Employee = mongoose.model("Employee", EmployeeSchema, "employees");
module.exports = Employee;
