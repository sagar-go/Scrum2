const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  dev: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  manager: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  createdAt: { type: Number },
});

module.exports = mongoose.model("Task", taskSchema);
