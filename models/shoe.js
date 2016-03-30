var mongoose = require('mongoose');


var ShoeSchema = new mongoose.Schema({
  brand: {type: String, required: true},
  kind: {type: String, required: true},
  image: {type: String, required: true},
  upvotes: {type: Number, default: 0},
  createdAt: { type : Date, default: Date.now() }
});



// create a method directly on the model: `all`

ShoeSchema.statics.all = function all(cb) {
  return
    this.model.find({})
    .catch(function(err) {
      console.log(err);
    })
    .then(function(shoes) {
      cb(shoes);
    })
  ;
};


// define the model
var Shoe = mongoose.model("Shoe", ShoeSchema);
// export the model to any files that `require` this one
module.exports = Shoe;





// How to store a comment in shoe
//find or get a hold of shoe that gets the comment

// Comment.create({body: "aekhqwehwqhewq"}, function(err, comment) {
//   if(err) {return console.log(err)}
//     // take the shoe.comments and push in the newly commented id
//     shoe.comments.push(comment.id);
// });

// shoe.comments => ["123123asdque2n12n", "1239uo12u3219312"]

// an example to get all comments from shoe