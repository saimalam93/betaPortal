const Task = require("../models/tasks");
const moment = require("moment");
const mongoose = require("mongoose");
const match = require("nodemon/lib/monitor/match");

async function getTasks(_) {
  let tasks = Task.find().populate("taskEmployee");
  return await tasks;
}

// Get all the tasks by employee id

async function getTaskById(_, { _id }) {
  let tasks = Task.find({ taskEmployee: _id }).populate("taskEmployee");
  return await tasks;
}

async function createTask(_, { task }) {
  task._id = new mongoose.Types.ObjectId();
  task.assignedDate = moment().format("YYYY-MM-DD");
  console.log(task);
  if (task.startDate == "" || task.startDate == null) {
    task.startDate = moment().format("YYYY-MM-DD");
  }

  const newTaskID = await Task.create(task);
  return await Task.findById(newTaskID._id).populate("taskEmployee");
}

// Find task by id and update the task status

async function updateTaskStatus(_, { task }) {
  let result = await Task.findOneAndUpdate(
    { _id: task._id },
    { taskStatus: task.taskStatus }
  );
  if (result) {
    return true;
  }
  return false;
}

async function deleteTask(_, { _id }) {
  let result = await Task.deleteOne({ _id: _id });
  if (result) {
    return true;
  }
  return false;
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  deleteTask,
};
