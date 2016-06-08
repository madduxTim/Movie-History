"use strict";
app.controller("MoviesCTRL", function($scope, $location, movieQueryStore, chosenStorage){

  $scope.searchOMDB = () => {
    $scope.queryStorage = [];
    movieQueryStore.movieSearchCall()
      .then(function(queryResults){
        $scope.queryStorage = queryResults[0];
                let imdbID = $scope.queryStorage[2].imdbID;
    });
  },


  $scope.addToChosenList = function(newChosenMovie){

    chosenStorage.postNewChosenMovie(newChosenMovie)
      .then(function successCallback(response) {
        $location.url("/list");
        Materialize.toast("Movie Added!", 3000, "rounded");
      });
  };


});