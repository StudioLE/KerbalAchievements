'use strict'

/*****************************************************************
*
* Declare app level module which depends on views, and components
*
******************************************************************/
angular.module('app', [
  'ngRoute',
  'ngResource',
  'LocalStorageModule',
  'navList',
  'jsonFormatter',
  'app.config',
  'app.dashboard',
  'app.pages',
  'app.timeline',
  'app.dataFactory',
  'app.eventsFactory',
  'app.parseFactory'
])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/404'})
}])

/*****************************************************************
*
* Lodash
*
******************************************************************/
.constant('_', window._)
