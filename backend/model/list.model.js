const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Enter a task description'
    },
    tasks: {
      type: Array,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const List = mongoose.model('List', ListSchema);
module.exports = List;
