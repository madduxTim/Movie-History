'use strict';

app.factory("watchListStorage", function($q, $http, firebaseURL) {

  var postNewWatchMovie = function(newWatchMovie) {
    console.log("Trying to post stuff!");

    return $q(function(resolve, reject) {
      $http
        .post(firebaseURL + "movies.json",
          JSON.stringify({
            title: newWatchMovie.title,
            year: newWatchMovie.year,
            rating: newWatchMovie.rating,
          }))
        .success(function(objectFromFirebase) {
          resolve(objectFromFirebase);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  return {postNewWatchMovie:postNewWatchMovie};

});