const dateScalar = require("../controllers/graphql_type.js");
const employees = require("../controllers/employees.js");

const adminResolvers = {
  Date: dateScalar,
  Query: {
    viewAllEmployees: employees.viewAllEmployees,
    viewSingleEmployee: employees.viewSingleEmployee,
  },
  Mutation: {
    addNewEmployee: employees.addNewEmployee,
    updateEmployee: employees.updateEmployee,
    deleteEmployee: employees.deleteEmployee,
    resetPassword: employees.resetPassword,
    updatePassword: employees.updatePassword,
  },
};

module.exports = adminResolvers;
