const Employee = require("../models/employee.js");

async function listAllEmployees(_, filters) {
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

async function listSingleEmployee(_, { id }) {
  return await Employee.findOne({ id });
}

async function createEmployee(_, { employee }) {
  const all = await Employee.find({});

  employee.id = all.length + 1;
  employee.currentStatus = 1;

  if (employee.dateOfJoining == "" || employee.dateOfJoining == null) {
    employee.dateOfJoining = moment().format("YYYY-MM-DD");
  }

  return await Employee.create(employee);
}

async function updateEmployee(_, { employee }) {
  const result = await Employee.findOneAndUpdate(
    { id: employee.id },
    { $set: employee }
  );
  if (result) {
    return true;
  }
  return false;
}

async function deleteEmployee(_, { id }) {
  const result = await Employee.findOneAndDelete({ id });
  if (result) {
    return true;
  }
  return false;
}

module.exports = {
  listAllEmployees,
  listSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
