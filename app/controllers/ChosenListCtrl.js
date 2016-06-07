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

  $scope.deleteMovie = function(movieId){
    chosenStorage.deleteChosenMovie(movieId).then(function(response){
      chosenStorage.getChosenMovieList().then(function(someCollection){
        $scope.chosenMovies = someCollection;
      });
    });
    console.log("working", movieId);
  };

});
