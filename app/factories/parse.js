'use strict'

angular.module('app.parseFactory', [])

/*****************************************************************
*
* User factory
*
******************************************************************/
.factory('Parse', function(Events) {
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

      return str
    },

    renameDuplicates: function(str, key) {
      var i = 0
      str = str.replace(new RegExp('"'+key+'":',"gi"), function() {
          return '"' + key + i++ + '":' 
      })
      return str
    },

    progress: function(data, body) {
      var Parse = this

      _.each(data, function(obj, key) {
        if(obj.completed) {
          if(body) {
            obj.body = body
            obj.group = body
          }
          Events.add(Parse.progressObject(obj, key))
        }
        else if(_.isObject(obj)) {
          Parse.progress(obj, key)
        }
      })
    },

    progressObject: function(obj, key) {
      var Parse = this
      var title = _.startCase(key)
      var icon = 'kerbin'
      if(obj.body) {
        title = obj.body + ' ' + title
        icon = obj.body
      }
      return {
        media: {
          url: '/img/' + icon.toLowerCase() + '.jpg',
        //   "caption": "",
        //   "credit": ""
        },
        start_date: {
          year: _.parseInt(obj.completed / 3600) // Convert to Kerbin hours
        },
        display_date: Parse.date(obj.completed),
        text: {
          headline: title,
          text: Parse.progressText(obj)
        },
        // group: obj.group
      }
    },

    progressText: function(obj) {
      var output = ''
      if(obj.vessel) {
        output += '<dl><dt>Vessel</dt> <dd>' + obj.vessel.name + '</dd></dl>'
      }
      if(obj.crew) {
        output += '<dl><dt>Crew</dt> <dd>' + obj.crew.crews + '</dd></dl>'
      }
      if(obj.body) {
        output += '<dl><dt>Body</dt> <dd>' + obj.body + '</dd></dl>'
      }
      if(obj.record) {
        output += '<dl><dt>Record</dt> <dd>' + obj.record + '</dd></dl>'
      }
      if( ! output) output = '&nbsp;'
      return output
      // return JSON.stringify(obj)
    },

    vessel: function(data, body) {
      var Parse = this

      _.each(data, function(obj, key) {
        if(obj.type && obj.type != 'Debris') {
          Events.add(Parse.vesselObject(obj, key))
        }
      })
    },

    vesselObject: function(obj, key) {
      var Parse = this
      var title = obj.name + ' Launched'
      var icon = obj.type.toLowerCase()
      if(obj.type == 'Flag') {
        title = obj.name + ' Flag Planted'
      }
      else if(obj.type == 'SpaceObject') {
        title = obj.name + ' Tracked'
      }
      return {
        media: {
          url: '/img/' + icon + '.png',
        //   "caption": "",
        //   "credit": ""
        },
        start_date: {
          year: _.parseInt(obj.lct / 3600) // Convert to Kerbin hours
        },
        display_date: Parse.date(obj.lct),
        text: {
          headline: title,
          text: Parse.vesselText(obj)
        },
        // group: obj.group
      }
    },

    vesselText: function(obj, key) {
      var output = ''
      console.log(obj.lct + obj.met)
      if(obj.pid) {
        output += '<dl style="display: none;"><dt>id<dt/> <dd>' + obj.pid + '</dd></dl>'
      }
      if(obj.sit && obj.type != 'Flag') {
        output += '<dl><dt>Situation<dt/> <dd>' + _.capitalize(obj.sit.toLowerCase()) + '</dd></dl>'
      }
      if(obj.landed && obj.type != 'Flag') {
        output += '<dl><dt>Landed at<dt/> <dd>' + _.startCase(obj.landedAt) + '</dd></dl>'
      }
      if(obj.splashed && obj.type != 'Flag') {
        output += '<dl><dt>Splashed at<dt/> <dd>' + _.startCase(obj.splashedAt) + '</dd></dl>'
      }
      if(obj.type) {
        output += '<dl><dt>Type<dt/> <dd>' + obj.type + '</dd></dl>'
      }
      return output
    },

    date: function(timestamp) {
      var output = ''
      var secondsPer = {
        year: 9201600, // 426 days per year
        day: 21600, // 6 hours per day
        hour: 3600, // 60 mins per hour
        min: 60, // 60 seconds per min
      }
      var date = {}
      // Calc is the value in seconds that we have already been accounted for
      date.year = _.floor(timestamp / secondsPer.year)
      var calc = (date.year * secondsPer.year)
      date.day = _.floor((timestamp - calc) / secondsPer.day)
      calc = calc + (date.day * secondsPer.day)
      date.hour = _.floor((timestamp - calc) / secondsPer.hour)
      calc = calc + (date.hour * secondsPer.hour)
      date.min = _.floor((timestamp - calc) / secondsPer.min)
      calc = calc + (date.min * secondsPer.min)
      date.sec = _.floor(timestamp - calc)

      return 'Year ' + date.year + ', Day ' + date.day + ', ' + _.padLeft(date.hour, 2, 0) + ':' + _.padLeft(date.min, 2, 0) + ''// + date.year + 's'
    }

  }
})
