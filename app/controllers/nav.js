angular.module('navList', [])

.controller('navCtrl', function($scope, $location, Data, Config) {
  $scope.navClass = function(href) {
    return href === '#' + $location.path() ? 'active' : ''
  }

  $scope.nav = [{
    url: '#/import',
    title: 'Import',
    icon: 'fa-upload'
  }, {
    url: '#/timeline',
    title: 'Timeline',
    icon: 'fa-calendar-check-o'
  }]

  $scope.navView = function() {
    return 'views/nav.html'
  }

  $scope.clearData = function() {
    window.location.href = '/#/import'
    return Data.unset()
  }

  $scope.dataIsSet = function() {
    return Data.isset()
  }

})
