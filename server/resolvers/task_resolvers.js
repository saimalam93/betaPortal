const dateScalar = require("../controllers/graphql_type.js");
const tasks = require("../controllers/tasks.js");

const taskResolvers = {
  Date: dateScalar,
  Query: {
    getTasks: tasks.getTasks,
    getTaskById: tasks.getTaskById,
  },
  Mutation: {
    createTask: tasks.createTask,
    updateTaskStatus: tasks.updateTaskStatus,
  },
};

module.exports = taskResolvers;
