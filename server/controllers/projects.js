const Project = require("../models/project.js");
const moment = require("moment");

async function viewAllProjects(_, {filters}) {
  let projects = Project.find().populate("projectManager");
  if (filters.ProjectType) {
    projects = projects.or({ projectType: filters.ProjectType });
  }
  if (filters.projectCost) {
    projects = projects.or({ projectCost: filters.projectCost });
  }
  if (filters.projectClient) {
    projects = projects.or({ projectClient: filters.projectClient });
  }
  if (filters.projectStatus) {
    projects = projects.or({ projectStatus: filters.projectStatus });
  }
  if (filters.projectManager) {
    projects = projects.or({ projectManager: filters.projectManager });
  }
  if (filters.startDate) {
    projects = projects.or({ startDate: filters.startDate });
  }
  if (filters.endDate) {
    projects = projects.or({ endDate: filters.endDate });
  }
  return await projects;
}

async function viewSingleProject(_, { _id }) {
  return await Project.findOne({ _id: _id }).populate("projectManager");
}

async function addNewProject(_, { project }) {
  project.projectNum = await generateProjectNumber({ project });

  if (project.startDate == "" || project.startDate == null) {
    project.startDate = moment().format("YYYY-MM-DD");
  }

  return await Project.create(project);
}

async function generateProjectNumber({ project }) {
  const clientProjects = await Project.find({
    projectClient: project.projectClient,
  });
  const clientProjectsCount = (clientProjects.length + 1).toString();
  const clientProjectsCountStringPadded = clientProjectsCount.padStart(3, "0");
  const projectNumber = `${project.projectClient.substring(
    0,
    3
  )}-${clientProjectsCountStringPadded}`;
  return projectNumber;
}

async function updateProject(_, { project }) {
  const result = await Project.findOneAndUpdate(
    { _id: project._id },
    { $set: project }
  );
  if (result) {
    return true;
  }
  return false;
}

async function deleteProject(_, { _id }) {
  const result = await Project.findOneAndDelete({ _id: _id });
  if (result) {
    return true;
  }
  return false;
}

module.exports = {
  viewAllProjects,
  viewSingleProject,
  addNewProject,
  updateProject,
  deleteProject,
};
