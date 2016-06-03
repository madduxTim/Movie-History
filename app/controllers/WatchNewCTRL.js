'use strict';

app.controller('WatchNewController', function($scope, $location, watchListStorage) {

  $scope.newWatchMovie = {
    title: "",
    year: "",
    rating: "",
    uid: ""
  };

  $scope.checkClick = function(item){
    var thingy = angular.element(item.currentTarget.offsetParent);
    console.log(thingy); // Giving back the card div that was clicked
    // Still need to figure out how to get the value of the title text for that div
    // It ought to work something like the wysiwyg exercise,
    // but not sure about impact of Angular on methods here...
  }

  $scope.addToWatchList = function(){
    console.log("You clicked me");
    watchListStorage.postNewWatchMovie($scope.newWatchMovie)
      .then(function successCallback(response) {
        $location.url("/");
      });
  };

});


