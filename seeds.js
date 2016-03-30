var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kicksoftheday');
var Shoe = require('./models/Shoe');
var Comment = require('./models/Comments');

var jordan = {
	brand: 'Jordan',
	kind: 'X',
	image: 'http://cdn.sneakernews.com/wp-content/uploads/2008/07/air-jordan-x-steel.jpg'	
};

var shoe;

// var comments = [];

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  shoeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe'}
});

var comment1 = {
	body: "so cool!",
	author: 'Daniel'
};

var comment2 = {
	body: "so!",
	author: 'D'
};

Shoe.remove ({}, function (err, res){
	console.log('shoes removed');
});

Comment.remove ({}, function (err, res){
	console.log('comments removed');
});

Shoe.create(jordan, function (err, jordan) {
	// take the shoe and make it equal to the newly created shoe
	shoe = jordan;
	console.log('shoe created');

	var comment1 = {
		body: "so cool!",
		author: 'Daniel',
		shoeId: jordan._id
	};

	var comment2 = {
		body: "so!",
		author: 'D',
		shoeId: jordan._id
	};

	Comment.create(comment1, function (err, createdComment1) {
		process.exit();

	});

});



// Comment.create(comment1, function (err, createdComment1) {
// 	Shoe.find({ _id: { $in: jordan._id }}, function(err, comments) {
// 				console.log("comments", comments);
// 				process.exit();
// 			});

// }

// Comment.create(comment1, function (err, createdComment1) {
	// take the newly created comment id and push it into the shoe
	// var commentId = createdComment1._id; 
	// comments.push(commentId);
	// create the second comment
	// Comment.create(comment2, function(err, createdComment2) {
		// push the second comment inside the comments
		// comments.push(createdComment2._id);
		// make the shoe.comments = comments
		// shoe.comments = comments;
		// save the shoe
// 		shoe.save(function() {
// 			console.log(shoe.comments);
// 			Comment.find({ _id: { $in: shoe.comments }}, function(err, comments) {
// 				console.log("comments", comments);
// 				process.exit();
// 			});
// 		});
// 	});
// });

// Shoe.findOne({brand: 'Jordan'}, function (err, res) {
// 	var shoeComments = res.comments;
// 		Comment.find({ _id: { $in: shoeComments}}, function(err, comments){
// 			console.log(comments);

// 		});

// });



