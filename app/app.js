var app = angular.module("MovieHistory", ["ngRoute"])
  .constant("firebaseURL", "https://groovymoviehistory.firebaseio.com/")

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
})

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: "partials/movie-history.html",
            controller: "MoviesCTRL",
            resolve: {isAuth}
        }).
        when("/new", {
            templateUrl: "partials/movie-list-area.html",
            controller: "ChosenNewCtrl",
            resolve: {isAuth}
        }).
        when("/list", {
            templateUrl: "partials/chosen-list-area.html",
            controller: "ChosenListCtrl",
            resolve: {isAuth}
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL",
            resolve: !{isAuth}
        }).
        when("/logout", {
        templateUrl: "partials/login.html",
        controller: "AuthCTRL"
      }).
        // when("/", {
        //     templateUrl: "partials/",
        //     controller: ""
        // }).
      otherwise("/");
});

app.run(($location) => {
  let movieRef = new Firebase("https://groovymoviehistory.firebaseio.com/");

  movieRef.onAuth(authData => {
    if(!authData) {
      $location.path("/login");
    }
  });
});

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  };
});



app.controller('appController', ['$scope', function ($scope) {
    $scope.starRating3 = 0;

    $scope.click3 = function (param) {
        console.log('Click(' + param + ')');
    };

}]);

app.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
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
    
        $scope.isolatedClick = function (param) {
          if ($scope.readOnly == 'true') return;

          $scope.rating = $scope._rating = param;
          $scope.hoverValue = 0;
          $scope.click({
            param: param
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
