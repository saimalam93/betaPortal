const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  fname: String,
  lname: String,
  age: Number,
  dateOfJoining: { type: Date, default: new Date() },
  title: String,
  department: String,
  employeeType: String,
  currentStatus: { type: Number, default: 1 },
});

const Employee = mongoose.model("Employee", EmployeeSchema, "employees");
module.exports = Employee;
