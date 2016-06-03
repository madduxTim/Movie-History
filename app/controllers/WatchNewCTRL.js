'use strict';

app.controller('WatchNewController', function($scope, $location, watchListStorage) {

  $scope.newWatchMovie = {
    title: "",
    year: "",
    rating: "",
    uid: ""
  };

  $scope.addToWatchList = function(){
    watchListStorage.postNewWatchMovie($scope.newWatchMovie)
      .then(function successCallback(response) {
        $location.url("/");
      });
  };

});