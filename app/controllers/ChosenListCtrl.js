"use strict";

app.controller('ChosenListCtrl', function($scope, $location, chosenStorage){

  $scope.chosenMovies = [];

  chosenStorage.getChosenMovieList().then(function(someCollection){
    $scope.chosenMovies = someCollection;
  });

  $scope.rankMovie = function(movieToRank){

    chosenStorage.rankChosenMovie(movieToRank)
      .then(function successCallback(response) {
        $location.url("/list");
      });
  };


});
