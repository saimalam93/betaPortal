const dateScalar = require("../controllers/graphql_type.js");
const tasks = require("../controllers/tasks.js");

const taskResolvers = {
  Date: dateScalar,
  Query: {
    getTasks: tasks.getTasks,
  },
  Mutation: {
    createTask: tasks.createTask,
  },
};

module.exports = taskResolvers;
