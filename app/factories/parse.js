'use strict'

angular.module('app.parseFactory', [])

/*****************************************************************
*
* User factory
*
******************************************************************/
.factory('Parse', function() {

  var regex = {
    date: /on (\d\d) (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    supermarkets: /(SAINSBURYS|tesco|co-op|waitrose|M&S)/i,
    social: /(Inn|Pub|The Red Lion|LIBERTY BOUNDS|MILE CASTLE|EL MEXICANA|GLASS HOUSE|SCENARIO|THE ARCH CLIMBING|COUNTING HOUSE|Crosse Keys|ALL BAR ONE|METROPOLITAN)/i,
    lunch: /(Subway|CLIFTON EXPRESS|NORTHUMBRIA UNIVER|MCDONALDS|NATIONAL TRUST|NORWICH CATERING|COSTA|THE PASTY SHOP|eat|the restaurant cha|PRET A MANGER|FINE BURGER COMPAN|CH&CO CATERING) /i
  }

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
    }

  }
})
