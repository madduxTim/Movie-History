"use strict";
app.controller("MoviesCTRL", function($scope, movieQueryStore){
    
    $scope.searchOMDB = () => {
        $scope.queryStorage = [];
        movieQueryStore.movieSearchCall()
            .then(function(queryResults){
                $scope.queryStorage = queryResults[0];
                console.log($scope.queryStorage[0]);
        });
    },

    $scope.addToWatchList = () => {
        console.log("working");
    }
});