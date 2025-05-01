const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: String,
  content: String,
});

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  comments: [CommentSchema],
});

module.exports = mongoose.model('Post', PostSchema);
