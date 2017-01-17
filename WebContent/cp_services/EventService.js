(function() {
'use strict';

    angular
        .module('mainApp')
        .factory('EventService', EventService);

    EventService.$inject = ['$http', '$q'];
    function EventService($http, $q) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/event/';
        var service = {};

        service.getAllEvents = getAllEvents;
        service.getEvent = getEvent;
        service.createEvent = createEvent;
        service.updateEvent = updateEvent;

        function getAllEvents() {
            return $http.get(BASE_URL).then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }

        function getEvent(id) {
            return $http.get(BASE_URL + id).then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }

        function createEvent(Event) {
            return $http.post(BASE_URL, Event).then(
                getAllEvents,
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }

        function updateEvent(Event) {
            return $http.put(BASE_URL + Event.eventId, Event).then(
                getAllEvents,
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }
        
        return service;
    }
})();