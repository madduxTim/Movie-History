var app = angular.module("MovieHistory", ["ngRoute"])
  .constant("OMDBurl", "http://www.omdbapi.com/?s=Star&y=&plot=short&r=json")
  .constant("firebaseURL", "https://groovymoviehistory.firebaseio.com/")

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
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
        when("/list", {
            templateUrl: "partials/movie-list-area.html",
            controller: "WatchNewController",
            resolve: {isAuth}
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL",
            resolve: {isAuth}
        }).
        when('/logout', {
        templateUrl: 'partials/login.html',
        controller: "AuthCTRL"
      }).
        // when("/", {
        //     templateUrl: "partials/",
        //     controller: ""
        // }).
        otherwise("/");
});

app.run(($location) =>{
  let movieRef = new Firebase("https://groovymoviehistory.firebaseio.com/");

  movieRef.onAuth(authData =>{
    if(!authData){
      $location.path("/login");
    }
  });
});

