"use strict";

app.controller("AuthCTRL", function($scope, $rootScope, $location, firebaseURL, AuthFactory){
  let ref = new Firebase(firebaseURL);

  $scope.account = {
    email: "",
    password: ""
  };


  if($location.path() === "/logout"){
    Materialize.toast("User logged out", 3000, "rounded")
    ref.unauth();
    $rootScope.isActive = false;
  }

  $scope.register = () => {
    Materialize.toast('New account registered', 3000, 'rounded')
    ref.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    }, (error, userData) => {
      if(error){
        Materialize.toast(`Error creating user: ${error}`, 3000, "rounded");
      } else{
        $scope.login();
      }
    });
  };


  $scope.login = () => {
    AuthFactory
      .authenticate($scope.account)
      .then(() => {
        $rootScope.isActive = true;
        $location.path("/");
        $scope.$apply();
        Materialize.toast(`Welcome ${$scope.account.email}`, 3000, 'rounded')
      });
  };

});