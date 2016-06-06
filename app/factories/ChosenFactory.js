'use strict';

app.factory("chosenStorage", function($q, $http, firebaseURL, AuthFactory) {

  var postNewChosenMovie = function(newChosenMovie) {

    let user = AuthFactory.getUser();

    return $q(function(resolve, reject) {
      $http
        .post(firebaseURL + "movies.json",
          JSON.stringify({
            title: newChosenMovie.title,
            year: newChosenMovie.year,
            rating: newChosenMovie.rating,
            poster: newChosenMovie.poster,
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

  var getChosenMovieList = function() {
    console.log("Getting list");
    let chosenMovies = [];
    //let user = AuthFactory.getUser();

    return $q(function(resolve, reject) {
      $http
        .get(firebaseURL + "movies.json")
        .success(function(chosenMovieObject){
          var chosenMovieCollection = chosenMovieObject;
          console.log(chosenMovieCollection);
          Object.keys(chosenMovieCollection).forEach(function(key){
            chosenMovieCollection[key].id=key;
            chosenMovies.push(chosenMovieCollection[key]);
        });
        resolve(chosenMovies);
      })
      .error(function(error){
        reject(error);
      });
    });
  };

  return {postNewChosenMovie:postNewChosenMovie, getChosenMovieList:getChosenMovieList };

});

