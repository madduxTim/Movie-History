'use strict';

app.factory("chosenStorage", function($q, $http, firebaseURL, AuthFactory) {

  var postNewChosenMovie = function(newChosenMovie) {

    let user = AuthFactory.getUser();

    return $q(function(resolve, reject) {
      $http
        .post(firebaseURL + "movies.json",
          JSON.stringify({
            title: newChosenMovie.Title,
            year: newChosenMovie.Year,
            rating: 0,
            poster: newChosenMovie.Poster,
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

    let chosenMovies = [];
    let user = AuthFactory.getUser();

    return $q(function(resolve, reject) {
      $http
        .get(`${firebaseURL}movies.json?orderBy="uid"&equalTo="${user.uid}"`)
        .success(function(chosenMovieObject){
          var chosenMovieCollection = chosenMovieObject;
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

  var rankChosenMovie = function(movieToRank) {

    Materialize.toast(`Ranking changed to ${movieToRank.rating}`, 3000, "rounded");


    let user = AuthFactory.getUser();

    return $q(function(resolve, reject) {
      $http
        .patch(firebaseURL + "movies/" + movieToRank.id + ".json",
          JSON.stringify({
            rating: movieToRank.rating
          }))
        .success(function(objectFromFirebase) {
          resolve(objectFromFirebase);
        })
        .error(function(error) {
          reject(error);
        });
    });

  };


  var deleteChosenMovie = function(chosenMovieId){
    return $q(function(resolve, reject){
      $http
        .delete(firebaseURL + "movies/" + chosenMovieId + ".json")
        .success(function(objectFromFirebase){
          resolve(objectFromFirebase);
        })
        .error(function(error){
          reject(error);
      });
    });
  };


  return {deleteChosenMovie:deleteChosenMovie, postNewChosenMovie:postNewChosenMovie, getChosenMovieList:getChosenMovieList, rankChosenMovie:rankChosenMovie };

});

