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
.controller('TimelineCtrl', function($scope, $location, Data, Events, Parse) {


  /**
   * If no events stored then parse them
   */
  if( ! Events.isset()) {
    Parse.progress(Data.get().GAME.ProgressTracking.Progress)
  }

  /**
   * Get events from local storage
   */
  var events = Events.get()
  $scope.events = function() {
    return events
  }
  $scope.rerender = function() {
    Events.unset()
    Parse.progress(Data.get().GAME.ProgressTracking.Progress)
  }

  var timeline_json = {
    scale: "cosmological",
    events: $scope.events()
  }
  var timeline_options = {
    relative_date: false,
    timenav_height: 500,
    default_bg_color: 'black',
    duration: 500
  }
  window.timeline = new TL.Timeline('timeline-embed', timeline_json, timeline_options)

})
