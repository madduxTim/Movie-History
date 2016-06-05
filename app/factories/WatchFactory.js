'use strict';


app.factory("watchListStorage", function($q, $http, firebaseURL, AuthFactory) {

  var postNewWatchMovie = function(newWatchMovie) {

    let user = AuthFactory.getUser();

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
