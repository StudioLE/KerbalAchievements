'use strict'

angular.module('app.eventsFactory', [])

/*****************************************************************
*
* Events factory
*
******************************************************************/
.factory('Events', function(localStorageService, Data) {
  return {

    /**
     * Events getter
     *
     * @return {Array} events
     */
    get: function(dev) {
      return localStorageService.get('events')
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
     * Events add
     *
     * @return {Array} events
     */
    add: function(event) {
      var events = []
      if(this.isset()) {
        events = events.concat(this.get())
      }
      events.push(event)
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
