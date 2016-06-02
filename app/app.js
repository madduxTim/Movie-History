"use strict"

var app = angular.module("MovieHistory", ["ngRoute"])

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            templateUrl: "partials/movie-history.html",
            controller: "MoviesCTRL"
        }).
        when("/main", {
            templateUrl: "partials/movie-history.html",
            controller: "MoviesCTRL"
        }).
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        // when("/", {
        //     templateUrl: "partials/",
        //     controller: ""
        // }).
        otherwise("/");
});