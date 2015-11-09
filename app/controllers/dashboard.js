'use strict'

angular.module('app.dashboard', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/import', {
    templateUrl: 'views/import.html',
    controller: 'DashboardCtrl'
  })
  $routeProvider.when('/timeline', {
    templateUrl: 'views/timeline.html',
    controller: 'DashboardCtrl'
  })
  $routeProvider.when('/review', {
    templateUrl: 'views/review.html',
    controller: 'DashboardCtrl'
  })
}])

/*****************************************************************
*
* DashboardCtrl controlller
*
******************************************************************/
.controller('DashboardCtrl', function($scope, $location, Data, Parse) {

  /**
   * Get data from local storage
   */
  var data = Data.get()
  $scope.data = function() {
    return data
  }

  $scope.dataIsSet = function() {
    return Data.isset()
  }

  /**
   * Send the current data to console
   */
  $scope.checkData = function() {
    console.log($scope.data())
  }

  /**
   * Update data model
   *
   * Called when a x-editable is saved
   */
  $scope.updateData = function() {
    Data.set($scope.data())
  }

  /**
   * Remove row
   *
   * Called when a x-editable is saved
   */
  $scope.removeRow = function(row) {
    // Toggle remove
    row.removed = ! row.removed
    Data.set($scope.data())
  }

  /**
   * Import & parse SFS file
   *
   * Called when the file selection changes
   */
  $scope.importData = function() {

    // define reader
    var reader = new FileReader()

    // A handler for the load event (just defining it, not executing it right now)
    reader.onload = function(e) {
      var sfs

      sfs = Parse.sfsToJSON(reader.result)
      sfs = JSON.parse(sfs)

      // Add to the local scope so the user gets immediate feedback
      $scope.$apply(function() {
          $scope.results = true
      })

      // // Store data in Local Storage
      Data.set(sfs)

      // Redirect
      // $location.path('/timeline')
      window.location.href = '/#/timeline'
    }

    // get <input> element and the selected file
    var sfsFileInput = document.getElementById('sfsFile')
    var sfsFile = sfsFileInput.files[0]

    // use reader to read the selected file
    // when read operation is successfully finished the load event is triggered
    // and handled by our reader.onload function
    reader.readAsText(sfsFile)
  }

})
