// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Shoe = require('./models/shoe'),
    Comment = require('./models/Comments'),
    auth = require('./resources/auth');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// require and load dotenv
require('dotenv').load();

// parse application/json
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect('mongodb://localhost/kicksoftheday');

app.get('/api/me', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    res.send(user.populate('posts'));
  });
});

app.put('/api/me', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found.' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.send(user);
    });
  });
});

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
// get shoe id from url params (`req.params`)
  var shoeId = req.params.id;


  // find shoe in db by id
  Shoe.findOne({ _id: shoeId }, function (err, foundShoe) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(foundShoe);
    }
  });


});

//update Shoe
app.put('/api/shoes/:id', function (req, res) {
    var id = req.params.id;
    console.log('hit update route');
    Shoe.findById({_id: id}, function (err, foundShoe){
        if (err) console.log(err);
        foundShoe.brand = req.body.brand;
        foundShoe.kind = req.body.kind;
        foundShoe.upvotes = req.body.upvotes;
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

//comments
app.get('/api/comments', function (req, res) {
    Comment.find(function (err, allComments) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allComments);
    }
  });
});

app.post('/api/comments', function (req, res) {
    var newComment = new Comment(req.body);
  newComment.save(function (err, savedComment) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedComment);
    }
  });
});

app.get('/api/comments/:id', function (req, res) {
// get shoe id from url params (`req.params`)
  var commentId = req.params.id;


  // find shoe in db by id
  Comment.findOne({ _id: shoeId }, function (err, foundComment) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(foundComment);
    }
  });


});

//update Shoe
app.put('/api/comments/:id', function (req, res) {
    var id = req.params.id;
    console.log('hit update route');
    Comment.findById({_id: id}, function (err, foundShoe){
        if (err) console.log(err);
        foundComment.author = req.body.author;
        foundComment.body = req.body.body;
        foundComment.upvotes = req.body.upvotes;
        foundComment.save(function (err, saved){
            if (err) { console.log(err);}
            res.json(saved);
        });
    });
});

app.delete('/api/comments/:id', function (req, res) {
  var id = req.params.id;
  Comment.remove({_id:id}, function (err) {
    if (err)
    console.log(err);

  });

});

app.get('*', function (req, res) {
  res.render('index');
});

//signup and login

app.post('/auth/signup', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken.' });
    }
    var user = new User({
      displayName: req.body.displayName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: auth.createJWT(result) });
    });
  });
});

app.post('/auth/login', function (req, res) {
  User.findOne({ email: req.body.email }, '+password', function (err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }
      res.send({ token: auth.createJWT(user) });
    });
  });
});

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});