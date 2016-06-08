"use strict";
app.controller("MoviesCTRL", function($scope, $location, movieQueryStore, chosenStorage){
  $scope.queryStorage = [];

  $scope.searchOMDB = () => {
    movieQueryStore.movieSearchCall()
      .then(function(queryResults){
        $scope.queryStorage = queryResults[0];
        let imdbID = $scope.queryStorage[2].imdbID;
    });
  };


  $scope.addToChosenList = function(newChosenMovie){
    chosenStorage.postNewChosenMovie(newChosenMovie)
      .then(function successCallback(response) {
        Materialize.toast('Added to "My Movies"', 3000, "rounded");
      });
  };

});