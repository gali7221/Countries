angular.module("CountryApp", ['ngRoute', 'countriesLibrary', 'ui.bootstrap'])

.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl : 'app/home.html',
		controller : 'HomeCtrl'
	})
	.when('/countries', {
		templateUrl : 'app/countries.html',
		controller : 'CountriesCtrl'
	})
	.when('/countries/:countryID', {
		templateUrl : 'app/country.html',
		controller : 'CountryCtrl'	
	})

	.otherwise({
		redirectTo : '/'
	});
})

.controller("MainCtrl", ['$scope', '$location',
	function($scope, $location){
		$scope.q="";
		$scope.countriesSearch = function() {
			$location.path('/countries/');
			$scope.q = $scope.query;
			$scope.query = null;
		};
		$scope.countriesView = function() {
			$location.path('/countries/');
			$scope.q = "";
			$scope.query = null;
		};
		$scope.clearSearch = function () {
			$scope.query = null;
		};
}])

.controller("HomeCtrl", ['$scope', 'allCountries',
	function($scope, allCountries) {
  		allCountries()
		.then(function(data) {
			$scope.countries = data.geonames;
		});
}])


.controller("CountriesCtrl", ['$scope', '$location', 'allCountries',
	function($scope, $location, allCountries) {
		allCountries()
		.then(function(data) {
			$scope.countries = data.geonames;
		});
		$scope.selectCountry = function(country) {
			$scope.selected = country;
			$location.path('/countries/' + $scope.selected.countryCode);
		};
}])

.controller("CountryCtrl", ['$scope', '$route', 'countryRequest', 'findNeighbors',
	function($scope, /*$routeParams,*/ $route, countryRequest, findNeighbors) {
	$scope.countryID = $route.current.params.countryID;//$routeParams.countryID;
	countryRequest($scope.countryID)
	.then(function(data) {
		$scope.country = data.geonames[0];
	});
	findNeighbors($scope.countryID)
	.then(function(data){
		$scope.neighbors = data.geonames;
	});
}]);
