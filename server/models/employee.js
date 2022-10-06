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
  dateOfBirth: { type: Date},
  dateOfJoining: { type: Date, default: new Date() },
  role: String,
  employeeType: String,
  skills: [String],
  currentStatus: { type:String,default:"null" },
  sin: String,
});

const Employee = mongoose.model("Employee", EmployeeSchema, "employees");
module.exports = Employee;
