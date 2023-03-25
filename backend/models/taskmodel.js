const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sprint: {
    type: mongoose.Types.ObjectId,
    ref:'sprints',
    required: true
  },
  day: Number,
  month: Number,
  date: Number
});

taskSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.day = currentDate.getDate();
  this.month = currentDate.getMonth() + 1;
  this.date = currentDate.getFullYear();
  next();
});

const TaskModel = mongoose.model('tasks', taskSchema);

module.exports = TaskModel;