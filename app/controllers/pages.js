'use strict'

angular.module('app.pages', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    // redirectTo: '/import'
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  })
  $routeProvider.when('/404', {
    templateUrl: 'views/404.html',
    controller: 'PageCtrl'
  })
}])

.controller('PageCtrl', function() {
})

.controller('HomeCtrl', function(Data) {
  if(Data.isset()) {
    window.location.href = '/#/timeline'
  }
  else {
    window.location.href = '/#/import'
  }
})
