'use strict';

app.controller("ChosenNewController", function($scope, $location, chosenStorage) {

  $scope.newChosenMovie = {
    title: "",
    year: "",
    rating: 0,
    poster: "",
    uid: ""
  };

  $scope.checkClick = function(item){
    var thingy = angular.element(item.currentTarget.offsetParent);
    console.log(thingy); // Giving back the card div that was clicked
    // Still need to figure out how to get the value of the title text for that div
    // It ought to work something like the wysiwyg exercise,
    // but not sure about impact of Angular on methods here...
    var myTitle = thingy.find("title");
    console.log(myTitle);
  }

  $scope.addToWatchList = function(){
    console.log("You clicked me");
    chosenStorage.postNewChosenMovie($scope.newChosenMovie)
      .then(function successCallback(response) {
        $location.url("/");
      });
  };

});


