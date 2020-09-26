const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: 'Enter a task description',
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;