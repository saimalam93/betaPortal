const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: String,
  taskDescription: String,
  taskEmployee: { type: Schema.Types.ObjectId, ref: "Employee" },
  taskStatus: { type: String, default: "Todo" },
  endDate: { type: Date },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
