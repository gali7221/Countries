angular.module('countriesLibrary', [])

  .constant('COUNTRY_INFO', 'http://api.geonames.org/countryInfoJSON?')
  .constant('NEIGHBOURS', 'http://api.geonames.org/neighboursJSON?')
  .constant('USERNAME', '&username=gamalali')
  .constant('COUNTRY_PATH', '&country={{ id }}')
  
  .factory('allCountries', ['$rootScope', '$http', '$q', 'COUNTRY_INFO', 'USERNAME',
    function($rootScope, $http, $q, COUNTRY_INFO, USERNAME) {
      return function() {
        var defer = $q.defer();
        $rootScope.isLoading = true;
        $http.get(COUNTRY_INFO + USERNAME, { cache: true })
        .success(function(data) {
          defer.resolve(data);
          $rootScope.isLoading = false;
        });
        return defer.promise;
      };
    }])


  .factory('countryRequest', ['$http', '$q', '$interpolate', 'COUNTRY_INFO', 'USERNAME', 'COUNTRY_PATH',
    function($http, $q, $interpolate, COUNTRY_INFO, USERNAME, COUNTRY_PATH) {
    return function(query) {
      var defer = $q.defer();

      var path = $interpolate(COUNTRY_PATH)({
        id : query
      });

      $http.get(COUNTRY_INFO + path + USERNAME, { cache: true })
        .success(function(data) {
          defer.resolve(data);
        });
      return defer.promise;
    };
  }])


  .factory('findNeighbors', ['$rootScope', '$http', '$q', '$interpolate', 'NEIGHBOURS', 'USERNAME', 'COUNTRY_PATH',
    function($rootScope, $http, $q, $interpolate, NEIGHBOURS, USERNAME, COUNTRY_PATH) {
    return function(country) {
      var defer = $q.defer();

      var path = $interpolate(COUNTRY_PATH)({
        id : country
      });

      $rootScope.isLoading = true;

      $http.get(NEIGHBOURS + path + USERNAME, { cache: true })
        .success(function(data) {
          defer.resolve(data);
          $rootScope.isLoading = false;
        });
      return defer.promise;
    };
  }]);