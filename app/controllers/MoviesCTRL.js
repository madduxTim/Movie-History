"use strict";
app.controller("MoviesCTRL", function($scope, $location, movieQueryStore, chosenStorage){

  // $scope.newChosenMovie = {
  //   title: "",
  //   year: "",
  //   rating: 0,
  //   poster: "",
  //   uid: ""
  // };

    $scope.searchOMDB = () => {
        $scope.queryStorage = [];
        movieQueryStore.movieSearchCall()
            .then(function(queryResults){
                $scope.queryStorage = queryResults[0];
                //console.log($scope.queryStorage[0]);
        });
    },


  $scope.addToChosenList = function(newChosenMovie){

    chosenStorage.postNewChosenMovie(newChosenMovie)
      .then(function successCallback(response) {
        $location.url("/list");
      });
  };


});