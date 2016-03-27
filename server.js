// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Shoe = require('./models/shoe');
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect('mongodb://localhost/kicksoftheday');

app.get('/api/shoes', function (req, res) {
    Shoe.find(function (err, allShoes) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allShoes);
    }
  });
});

app.post('/api/shoes', function (req, res) {
    var newShoe = new Shoe(req.body);
  newShoe.save(function (err, savedShoe) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedShoe);
    }
  });
});

app.get('/api/shoes/:id', function (req, res) {
// get todo id from url params (`req.params`)
  var shoeId = req.params.id;

  // find todo in db by id
  Shoe.findOne({ _id: shoeId }, function (err, foundShoe) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(foundShoe);
    }
  });


});

//update TODO
app.put('/api/shoes/:id', function (req, res) {
    var id = req.params.id;
    Shoe.findById({_id: id}, function (err, foundShoe){
        if (err) console.log(err);
        foundShoe.brand = req.body.brand;
        foundShoe.kind = req.body.kind;
        foundShoe.save(function (err, saved){
            if (err) { console.log(err);}
            res.json(saved);
        });
    });
});

app.delete('/api/shoes/:id', function (req, res) {
	var id = req.params.id;
	Shoe.remove({_id:id}, function (err) {
		if (err)
		console.log(err);

	});

});
app.get('*', function (req, res) {
  res.render('index');
});

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});