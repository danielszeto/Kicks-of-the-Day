var app = angular.module('kicksoftheday', [
  'ui.router', 
  'ngResource', 
  'satellizer'
  ])

  .config(config)
  ;


// app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    console.log('config');
    //this allows us to use routes without hash params!
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    // for any unmatched URL redirect to /
    $urlRouterProvider.otherwise("/");

     $stateProvider
      .state('home', {
        url: "/",
        controller: 'HomeController',
        controllerAs: 'home',
        templateUrl: "templates/home.html"
      })

      .state('about', {
        url: "/about",
        controller: 'HomeController',
        controllerAs: 'home',
        templateUrl: "templates/about.html"
      	})

       .state('show', {
        url: "/shoes/:id",
        controller: 'HomeController',
        controllerAs: 'home',
        templateUrl: "templates/shoeshow.html"
      	})

      .state('contact', {
        url: "/contact",
        controller: 'HomeController',
        controllerAs: 'home',
        templateUrl: "templates/contact.html"
        // template: 'Home!'
      	});

  }



app.controller('HomeController', HomeController);

	function HomeController(Shoe, Comment, $scope) {
		this.newShoe = {};
    this.shoes = Shoe.query();
    this.createShoe = createShoe;
    this.updateShoe = updateShoe;
    this.deleteShoe = deleteShoe;
    this.incrementUpvotes = incrementUpvotes;
    this.newComment ={};
    this.comments = Comment.query();
    this.createComment = createComment;

	function updateShoe(shoe) {
		console.log('updating3');
	    Shoe.update({id: shoe._id}, shoe);
	    this.displayEditForm = false;
  	}

  function incrementUpvotes(shoe){
      console.log('incrementing');
      shoe.upvotes += 1;
      Shoe.update({id: shoe._id}, shoe);
      // console.log(shoe.upvotes);
    }

	 function createShoe(){
	 	console.log('incrementing2');
	      Shoe.save(this.newShoe);
	      this.shoes.push(this.newShoe);
	      this.newShoe = {};
	      console.log('saved');
	 }

  	function deleteShoe(shoe) {
	  	console.log("deleting", shoe._id);
	    Shoe.remove({id:shoe._id});
	    var shoesIndex = this.shoes.indexOf(shoe);
	    this.shoes.splice(shoesIndex, 1);
  	}

    function createComment(shoe) {
      this.newComment.shoeId = shoe._id;
      Comment.save(this.newComment);
      this.comments.push(this.newComment);
      this.newComment = {};
      console.log('saved comment');
    }
}	

app.service('Shoe', function($resource) {
  return $resource('http://localhost:3000/api/shoes/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});

app.service('Comment', function($resource) {
  return $resource('http://localhost:3000/api/comments/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});


// auth stuff

MainController.$inject = ["Account"]; // minification protection
function MainController (Account) {
  var vm = this;

  vm.currentUser = function() {
   return Account.currentUser();
  };

}

LoginController.$inject = ["$location","Account"]; // minification protection
function LoginController ($location, Account) {
  var vm = this;
  vm.new_user = {}; // form data

  vm.login = function() {
    Account
      .login(vm.new_user)
      .then(function(){
         // TODO #4: clear sign up form
        vm.new_user = {};
         // TODO #5: redirect to '/profile'
         $location.path('/');
        });
  };
}

SignupController.$inject = ['$location',"Account"]; // minification protection
function SignupController ($location, Account) {
  var vm = this;
  vm.new_user = {}; // form data

  vm.signup = function() {
    Account
      .signup(vm.new_user)
      .then(
        function (response) {
          vm.new_user = {};
          $location.path('/');
          // TODO #9: clear sign up form
          // TODO #10: redirect to '/profile'
        }
      );
  };
}

LogoutController.$inject = ["Account", "$location"]; // minification protection
function LogoutController (Account, $location) {
  Account
    .logout()
    .then(function() {
      $location.path('/login');
    });
  // TODO #7: when the logout succeeds, redirect to the login page
}


ProfileController.$inject = ["Account", "$location"]; // minification protection
function ProfileController (Account, $location) {
  var vm = this;
  vm.new_profile = {}; // form data

  vm.updateProfile = function() {
    Account
    .updateProfile(vm.new_profile)
    .then(function() {
      vm.showEditForm = false;
    });


    // TODO #14: Submit the form using the relevant `Account` method
    // On success, clear the form
  };
}

//////////////
// Services //
//////////////

Account.$inject = ["$http", "$q", "$auth"]; // minification protection
  function Account($http, $q, $auth) {
    var self = this;
    self.user = null;

    self.signup = signup;
    self.login = login;
    self.logout = logout;
    self.currentUser = currentUser;
    self.getProfile = getProfile;
    self.updateProfile = updateProfile;

    function signup(userData) {
     // TODO #8: signup (https://github.com/sahat/satellizer#authsignupuser-options)
      // then, set the token (https://github.com/sahat/satellizer#authsettokentoken)
      // returns a promise
      return (
        $auth
          .signup(userData) // signup (https://github.com/sahat/satellizer#authsignupuser-options)
          .then(
            function onSuccess(response) {
              $auth.setToken(response.data.token); // set token (https://github.com/sahat/satellizer#authsettokentoken)
            },

            function onError(error) {
              console.error(error);
            }
          )
    );
  }



  function login(userData) {
    return (
      $auth
        .login(userData) // login (https://github.com/sahat/satellizer#authloginuser-options)
        .then(
          function onSuccess(response) {
            //TODO #3: set token (https://github.com/sahat/satellizer#authsettokentoken)
            $auth.setToken(response.data.token);
          },

          function onError(error) {
            console.error(error);
          }
        )
    );
  }

  function logout() {
    // returns a promise!!!
    // TODO #6: logout the user by removing their jwt token (using satellizer)
    // Make sure to also wipe the user's data from the application:
    // self.user = null;
    // returns a promise!!!

    return (
      $auth
        .logout()
        .then(function() {
          self.user = null;
        }) 
    );
  }

  function currentUser() {
    if ( self.user ) { return self.user; }
    if ( !$auth.isAuthenticated() ) { return null; }

    var deferred = $q.defer();
    getProfile().then(
      function onSuccess(response) {
        self.user = response.data;
        deferred.resolve(self.user);
      },

      function onError() {
        $auth.logout();
        self.user = null;
        deferred.reject();
      }
    )
    self.user = promise = deferred.promise;
    return promise;

  }

  function getProfile() {
    return $http.get('/api/me');
  }

  function updateProfile(profileData) {
    return (
      $http
        .put('/api/me', profileData)
        .then(
          function (response) {
            self.user = response.data;
          }
        )
    );
  }


}

