const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
