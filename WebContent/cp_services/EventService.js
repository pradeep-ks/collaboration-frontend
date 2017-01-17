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

        function createEvent(evt) {
            return $http.post(BASE_URL, evt).then(
                getAllEvents,
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }

        function updateEvent(evt) {
            return $http.put(BASE_URL + evt.eventId, evt).then(
                getAllEvents,
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }
        
        return service;
    }
})();