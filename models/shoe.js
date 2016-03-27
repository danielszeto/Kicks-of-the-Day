var mongoose = require('mongoose');

var ShoeSchema = new mongoose.Schema({
  brand: {type: String, required: true},
  kind: {type: String, required: true},
  image: {type: String},
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