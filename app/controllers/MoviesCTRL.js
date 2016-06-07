"use strict";

app.controller("MoviesCTRL", function($scope, $location, movieQueryStore, chosenStorage){
  $scope.queryStorage = [];

  $scope.searchOMDB = () => {
    movieQueryStore.movieSearchCall()
      .then(function(queryResults){
        $scope.queryStorage = queryResults[0];
    });
  };


  $scope.addToChosenList = function(newChosenMovie){
    chosenStorage.postNewChosenMovie(newChosenMovie)
      .then(function successCallback(response) {
        $location.url("/list");
        Materialize.toast("Movie Added!", 3000, "rounded");
      });
  };

});