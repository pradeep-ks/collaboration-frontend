(function() {
'use strict';

    angular
        .module('MainApp')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope', '$location', '$rootScope', 'EventService'];
    function EventController($scope, $location, $rootScope, EventService) {
        var vm = this;
        vm.Events = [];

        vm.getAllEvents = getAllEvents;
        vm.getEvent = getEvent;

        function getAllEvents() {
            EventService.getAllEvents().then(
                function(data) {
                    vm.Events = data;
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function getEvent(id) {
            EventService.getEvent(id).then(
                function(data) {
                    $location.path('/event-details');
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        init();

        function init() {
            vm.getAllEvents();
        }
    }
})();