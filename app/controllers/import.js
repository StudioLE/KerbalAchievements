'use strict'

angular.module('app.import', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/import', {
    templateUrl: 'views/import.html',
    controller: 'ImportCtrl'
  })
}])

/*****************************************************************
*
* ImportCtrl controlller
*
******************************************************************/
.controller('ImportCtrl', function($scope, $location, Data, Parse) {

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
