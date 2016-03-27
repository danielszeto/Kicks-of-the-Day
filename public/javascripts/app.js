var app = angular.module('kicksoftheday', ['ui.router', 'ngResource']);

app.config(config);

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

      .state('contact', {
        url: "/contact",
        controller: 'HomeController',
        controllerAs: 'home',
        templateUrl: "templates/contact.html"
        // template: 'Home!'
      	});
  }



app.controller('HomeController', HomeController);

	function HomeController(Shoe, $scope) {
		this.newShoe = {};
		this.shoes = Shoe.query();
		this.createShoe = createShoe;
		this.updateShoe = updateShoe;
		this.deleteShoe = deleteShoe;
		this.incrementUpvotes = incrementUpvotes;

	function updateShoe(shoe) {
		console.log('updating');
	    Shoe.update({id: shoe._id}, shoe);
	    this.displayEditForm = false;
  	}

	 function createShoe(){
	      Shoe.save(this.newShoe);
	      this.shoes.push(this.newShoe);
	      this.formContent = "";
	      console.log('saved');
	 }

  function deleteShoe(shoe) {
  	console.log("deleting", shoe._id);
    Shoe.remove({id:shoe._id});
    var shoesIndex = this.shoes.indexOf(shoe);
    this.shoes.splice(shoesIndex, 1);
  }

  function incrementUpvotes (shoe){
    console.log('incrementing');
     shoe.upvotes += 1;
     console.log(shoe.upvotes);
  }

}	

app.service('Shoe', function($resource) {
  return $resource('http://localhost:3000/api/shoes/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});

app.controller('MainCtrl', function($scope) {
  $scope.changeVote = function(vote, flag) {
    $scope.vote = vote == flag ? 'None' : flag;
    alert($scope.vote);
  };
});