"use strict";

app.controller('ChosenListCtrl', ['$scope', '$location', 'chosenStorage', function($scope, $location, chosenStorage){

  $scope.chosenMovies = [];
  $scope.starRating1 = 4;
  $scope.starRating2 = 5;
  $scope.starRating3 = 2;
  $scope.hoverRating1 = $scope.hoverRating2 = $scope.hoverRating3 = 0;

  chosenStorage.getChosenMovieList().then(function(someCollection){
    $scope.chosenMovies = someCollection;
  });


  $scope.deleteMovie = function(movieId, movieTitle){
    chosenStorage.deleteChosenMovie(movieId).then(function(response){
      chosenStorage.getChosenMovieList().then(function(someCollection){
        $scope.chosenMovies = someCollection;
        Materialize.toast(`${movieTitle} removed from your list`, 3000, "rounded");

      });
    });
  };


  if($location.path() === "/watched"){
    $scope.watched = true;
  }


  $scope.click1 = function(param) {

  };

  $scope.mouseHover1 = function(param) {

    $scope.hoverRating1 = param;
  };

  $scope.mouseLeave1 = function(param) {

    $scope.hoverRating1 = param + '*';
  };

}]);


app.directive('starRating', function ($location, chosenStorage) {
    return {
        scope: {
            rating: '=',
            movie: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
      controller: function ($scope, $element, $attrs) {
          $scope.maxRatings = [];

          for (var i = 1; i <= $scope.maxRating; i++) {
              $scope.maxRatings.push({});
          };

          $scope._rating = $scope.rating;
          $scope._movie = $scope.movie;

        $scope.isolatedClick = function (param) {

          $scope.rating = $scope._rating = param;
          $scope.hoverValue = 0;
          $scope.click({
            param: param
          });

          chosenStorage.rankChosenMovie($scope._movie, $scope._rating)
            .then(function successCallback(response) {
            });

        };

        $scope.isolatedMouseHover = function (param) {
          if ($scope.readOnly == 'true') return;

          $scope._rating = 0;
          $scope.hoverValue = param;
          $scope.mouseHover({
            param: param
          });
        };

        $scope.isolatedMouseLeave = function (param) {
          if ($scope.readOnly == 'true') return;

          $scope._rating = $scope.rating;
          $scope.hoverValue = 0;
          $scope.mouseLeave({
            param: param
          });
        };
      }
    };
});

