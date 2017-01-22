(function() {
'use strict';

    angular
        .module('MainApp')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope', '$location', '$rootScope', 'EventService'];
    function EventController($scope, $location, $rootScope, EventService) {
        var vm = this;
        vm.Event = null;
        vm.Events = [];

        vm.getAllEvents = getAllEvents;
        vm.getEvent = getEvent;
        vm.createEvent = createEvent;
        vm.updateEvent = updateEvent;
        vm.submit = submit;
        vm.reset = reset;
        vm.edit = edit;

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
                    vm.Event = data;
                    console.log(vm.Event);
                    $location.path('/event-details');
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function createEvent(Event) {
            EventService.createEvent(Event).then(
                function(response) {
                	getAllEvents();
                	$location.path('/list-events');
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function updateEvent(Event) {
            EventService.updateEvent(Event).then(
                getAllEvents,
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function submit() {
            vm.createEvent(vm.Event);
            vm.reset();
        }

        function reset() {
            vm.Event = {};
            $scope.eventForm.$setPristine();
        }

        function edit(id) {
            for (var i = 0; i < vm.Events.length; i++) {
                if (vm.Events[i].eventId === id) {
                    vm.Event = angular.copy(vm.Events[i]);
                    break;
                }
            }
        }

        init();

        function init() {
            vm.getAllEvents();
        }
    }
})();