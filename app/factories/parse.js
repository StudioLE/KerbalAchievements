'use strict'

angular.module('app.parseFactory', [])

/*****************************************************************
*
* User factory
*
******************************************************************/
.factory('Parse', function() {
  return {

    // Convert SFS string to JSON
    sfsToJSON: function(str) {

      // Convert keys and values
      str = str.replace(/(\t*)(.*) = (.*)/gmi, '$1"$2": "$3",')

      // Convert sections
      str = str.replace(/(\t*)(.*)$(\s*\{)/gmi, '$1"$2":$3')

      // Comma after }
      str = str.replace(/\}/gmi, '},')

      // Wrap in {}
      str = '{\n' + str + '\n}'

      // Remove extraneous commas
      str = str.replace(/,(\s*\})/gmi, '$1')

      // Fix boolean
      str = str.replace(/\"True\"/g, 'true')
      str = str.replace(/\"False\"/g, 'false')

      // Rename duplicate keys
      // str = this.renameDuplicates(str, 'scenario')
      // str = this.renameDuplicates(str, 'tech')
      // str = this.renameDuplicates(str, 'science')

      // Rename duplicate keys
      str = str.replace(/(\t*")(SCENARIO|KERBAL)(":\s*\{)(\s*)("name": ")(.*)(",$)/gmi, '$1$6$3$4$5$6$7')
      str = str.replace(/(\t*")(VESSEL)(":\s*\{)(\s*)("pid": ")(.*)(",$)/gmi, '$1$6$3$4$5$6$7')

      console.log(str)

      return str
    },

    renameDuplicates: function(str, key) {
      var i = 0
      str = str.replace(new RegExp('"'+key+'":',"gi"), function() {
          return '"' + key + i++ + '":' 
      })
      return str
    },

    extractAchievements: function(data) {
      var events = data.GAME.ProgressTracking.Progress
      return events
    }

  }
})
