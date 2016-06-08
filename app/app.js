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
        when("/search", {
            templateUrl: "partials/movie-history.html",
            controller: "MoviesCTRL",
            resolve: {isAuth}
        }).
        when("/new", {
            templateUrl: "partials/movie-list-area.html",
            controller: "ChosenNewCtrl",
            resolve: {isAuth}
        }).
        when("/", {
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

