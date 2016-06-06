"use strict";

app.controller("AuthCTRL", function($scope, $rootScope, $location, firebaseURL, AuthFactory){
  let ref = new Firebase(firebaseURL);

  // $scope.hasUser = false;

  $scope.account = {
    email: "",
    password: ""
  };


  if($location.path() === "/logout"){
    ref.unauth();
    $rootScope.isActive = false;
  }

  $scope.register = () => {
    ref.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    }, (error, userData) => {
      if(error){
        console.log(`Error creating user: ${error}`);
      } else{
        $scope.login();
      }
    });
  };


  $scope.login = () => {
    AuthFactory
      .authenticate($scope.account)
      .then(() => {
        // $scope.hasUser = true;
        $rootScope.isActive = true;
        $location.path("/");
        $scope.$apply();
      });
  };

});