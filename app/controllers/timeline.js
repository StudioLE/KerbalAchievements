'use strict'

angular.module('app.timeline', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/timeline', {
    templateUrl: 'views/timeline.html',
    controller: 'TimelineCtrl'
  })
}])

/*****************************************************************
*
* TimelineCtrl controlller
*
******************************************************************/
.controller('TimelineCtrl', function($scope, $location, Events, Parse) {

  /**
   * Get events from local storage
   */
  var events = Events.get()
  $scope.events = function() {
    return events
  }

})
