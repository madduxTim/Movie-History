"use strict";

app.controller('ChosenListCtrl', function($scope, chosenStorage){

  $scope.chosenMovies = [];

  chosenStorage.getChosenMovieList().then(function(someCollection){
    $scope.chosenMovies = someCollection;
  });


});