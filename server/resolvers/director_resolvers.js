const dateScalar = require("../controllers/graphql_type.js");
const projects = require("../controllers/projects.js");

const directorResolvers = {
  Date: dateScalar,
  Query: {
    viewAllProjects: projects.viewAllProjects,
    viewSingleProject: projects.viewSingleProject,
  },
  Mutation: {
    addNewProject: projects.addNewProject,
    updateProject: projects.updateProject,
    deleteProject: projects.deleteProject,
  },
};

module.exports = directorResolvers;
