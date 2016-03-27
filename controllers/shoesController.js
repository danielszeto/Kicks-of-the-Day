// var Shoe = require("../models/shoe");

// var shoesController = {
//   index: function(req, res) {
//     Shoe.find({}, function(err, shoes) {
//       // send back a JSON response of all the images, reverse-ordered
//       res.status(200).send(JSON.stringify(shoes.reverse()));
//     });
//   },
//   create: function(req, res) {
//     console.log(req.body);
//     var brand = req.body.brand;
//     var kind = req.body.kind;
//     var image = req.body.image;
//     Shoe.create({brand: brand, kind: kind, image: image}, function(err, shoe) {
//       console.log('error from create', err);
//       // err ?
//       //   // handle error
//       //   res.status(500).send() :
//       //   // handle success
//       //   res.status(201).send(JSON.stringify(image));
//     });
//   },
//   destroy: function(req, res) {
//     Shoe.remove({_id: req.params.id}, function(err, shoe) {
//       err ?
//         res.status(500).send() :
//         res.status(204).send(JSON.stringify(shoe));
//     });
//   }
// };

// module.exports = shoesController;