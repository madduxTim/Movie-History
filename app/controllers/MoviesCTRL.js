"use strict";
app.controller("MoviesCTRL", function($scope, movieQueryStore){
    
    $scope.searchOMDB = () => {
        $scope.queryStorage = [];
        movieQueryStore.movieSearchCall()
            .then(function(queryResults){
                $scope.queryStorage = queryResults[0];
                let imdbID = $scope.queryStorage[2].imdbID;
                console.log("imdbID", imdbID);
        });
    },

    $scope.addToWatchList = () => {
        console.log("working");
    }
});