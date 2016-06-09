"use strict";
app.controller("MoviesCTRL", function($scope, $location, movieQueryStore, chosenStorage){
  $scope.queryStorage = [];
  $scope.chosenMovies = [];
  $scope.idCheck = [];

  $scope.searchOMDB = () => {
    movieQueryStore.movieSearchCall()
      .then(function(queryResults){
        $scope.queryStorage = queryResults[0];
    });
  };

  chosenStorage.getChosenMovieList().then(function(someCollection){
    $scope.chosenMovies = someCollection;
  });

  $scope.addToChosenList = function(newChosenMovie){
    let dupe = false;
    for (var i = 0; i < $scope.chosenMovies.length; i++) {
        $scope.idCheck.push($scope.chosenMovies[i].imdbid);
    };
    for (var j = 0; j < $scope.idCheck.length; j++){
        if (newChosenMovie.imdbID === $scope.idCheck[j]) {
          dupe = true;
        };
    };
    if (dupe === false) {
        chosenStorage.postNewChosenMovie(newChosenMovie)
          .then(function successCallback(response) {
            Materialize.toast(`${newChosenMovie.Title} has been added to My Movies!`, 3000, "rounded");
            $scope.idCheck.push(newChosenMovie.imdbID);
        });
      } else {
          Materialize.toast(`${newChosenMovie.Title} has already been added to My Movies!`, 3000, "rounded"); 
      };
  };
});