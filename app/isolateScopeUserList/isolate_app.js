/**
*  Module
*
* Description
*/
angular.module('isolateApp', [])
  .controller('isolateScopeController',isolateScopeController);

isolateScopeController.$inject = ['$scope'];

function isolateScopeController($scope) {
  var vm = this;

  vm.users = [{id:"1",name:"John,Doe",email:"John@Doe.com"},
              {id:"21",name:"John,Doe",email:"John@Doe.com"},
              {id:"13",name:"John,Doe",email:"John@Doe.com"},
              {id:"14",name:"John,Doe",email:"John@Doe.com"}];

  vm.currentUser = vm.users[0];

  vm.showUser = function(user) {
    vm.currentUser = user;
  };
}

angular
  .module('isolateApp')
  .directive('userIsolateList',userIsolateList);

userIsolateList.$inject = [];

function userIsolateList() {
  return {
    restrict: 'E',
    templateUrl: 'user-list-tpl.html',
    scope: {
      users: '=',
      func: '&' // passing func reference from the controller
    },
    controller: function($scope) {
      $scope.passUserObject = function (user) {
        $scope.func({user:user}); //need to pass the argumnet as key:value pair and mention the key name in the html.
      };
    }
  };
}

//using shared scope between user-list and user-info-card
angular
  .module('isolateApp')
  .directive('userIsolateCard', userIsolateCard);

userIsolateCard.$inject = [];

function userIsolateCard() {
  return {
    restrict : 'E',
    templateUrl : 'user-info-card-tpl.html',
    controller : function($scope) {
      $scope.handleUserClick = function(user) {
        $scope.passUserObject(user);
        console.log('clicked on user', user);
      };
    }
  };
}


