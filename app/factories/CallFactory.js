"use strict";
app.factory("movieQueryStore", function($q, $http, OMDBurl){
    var getSearchMovies = function(){
        let queryStorage = [];
        let searchTerms = "Star";        
        return $q(function(resolve, reject){
            $http.get("http://www.omdbapi.com/?s="+searchTerms+"&y=&plot=short&r=json")
                .success(function(queryData){
                    var preKeyData = queryData;
                    Object.keys(preKeyData).forEach(function(key){
                        queryStorage.push(preKeyData[key]);
                    });
                    resolve(queryStorage);
                })
            .error(function(error){
                reject(error);
            });

    });
}
    return {getSearchMovies:getSearchMovies};
}); 