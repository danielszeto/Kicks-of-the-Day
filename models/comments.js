var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  shoeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe' }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;