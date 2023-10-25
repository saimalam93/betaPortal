const Task = require("../models/tasks");
const moment = require("moment");
const mongoose = require("mongoose");

async function getTasks(_, filters) {
  let tasks = Task.find().populate("taskEmployee");
  return await tasks;
}

async function createTask(_, { task }) {
  task._id = new mongoose.Types.ObjectId();
  if (task.startDate == "" || task.startDate == null) {
    task.startDate = moment().format("YYYY-MM-DD");
  }

  return await Task.create(task);
}

module.exports = {
  getTasks,
  createTask,
};
