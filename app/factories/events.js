'use strict'

angular.module('app.eventsFactory', [])

/*****************************************************************
*
* Events factory
*
******************************************************************/
.factory('Events', function(localStorageService, Data, Parse) {
  return {

    /**
     * Events getter
     *
     * @return {Array} events
     */
    get: function() {
      if(this.isset()) {
        return localStorageService.get('events')
      }
      else {
        console.log('extracting')
        var events = Parse.extractAchievements(Data.get())
        this.set(events)
        return this.get()
      }
      // console.log(events)
    },

    /**
     * Events setter
     *
     * @return {Array} events
     */
    set: function(events) {
      return localStorageService.set('events', events)
    },

    /**
     * Events is set
     *
     * @return {Bool} events
     */
    isset: function() {
      if(localStorageService.get('events')) {
        return true
      }
      else {
        return false
      }
    },

    /**
     * Events unset
     */
    unset: function() {
      return localStorageService.remove('events')
    }
  }
})
