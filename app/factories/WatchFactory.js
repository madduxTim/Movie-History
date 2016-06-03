'use strict';

app.factory("watchListStorage", function($q, $http, firebaseURL) {

  var postNewWatchMovie = function(newWatchMovie) {

    return $q(function(resolve, reject) {
      $http
        .post(firebaseURL + "movies.json",
          JSON.stringify({
            title: newWatchMovie.title,
            year: newWatchMovie.year,
            rating: newWatchMovie.rating,
            uid: user.uid
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