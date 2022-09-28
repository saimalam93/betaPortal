const dateScalar = require("../controllers/graphql_type.js");
const employees = require("../controllers/employees.js");

const adminResolvers = {
  Date: dateScalar,
  Query: {
    listAllEmployees: employees.listAllEmployees,
    listSingleEmployee: employees.listSingleEmployee,
  },
  Mutation: {
    createEmployee: employees.createEmployee,
    updateEmployee: employees.updateEmployee,
    deleteEmployee: employees.deleteEmployee,
  },
};

module.exports = adminResolvers;
