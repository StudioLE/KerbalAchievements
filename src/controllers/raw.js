'use strict'

angular.module('app.raw', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/raw', {
    templateUrl: 'views/raw.html',
    controller: 'RawCtrl'
  })
}])

/*****************************************************************
*
* RawCtrl controlller
*
******************************************************************/
.controller('RawCtrl', function($scope, Data, Events) {

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
