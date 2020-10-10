const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema(
  {
    /**
     * Title of Board.
     */
    title: {
      type: String
    },

    /**
     * List of tasks.
     * Consists of title(String) and tasks(Array).
     */
    list: {
      type: Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

const Board = mongoose.model('Board', BoardSchema);
module.exports = Board;
