'use strict'

angular.module('app.review', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/review', {
    templateUrl: 'views/review.html',
    controller: 'ReviewCtrl'
  })
}])

/*****************************************************************
*
* ReviewCtrl controlller
*
******************************************************************/
.controller('ReviewCtrl', function($scope, Data, Events) {

  /**
   * Get data from local storage
   */
  var data = Data.get()
  $scope.data = function() {
    return data
  }

  var events = Events.get()
  $scope.events = function() {
    return events
  }

})
