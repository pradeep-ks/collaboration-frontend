(function() {
'use strict';

    angular
        .module('mainApp')
        .controller('EventController', EventController);

    EventController.$inject = ['$scope', '$location', '$rootScope', 'EventService'];
    function EventController($scope, $location, $rootScope, EventService) {
        var vm = this;
        vm.evt = null;
        vm.events = [];

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
                    vm.events = data;
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function getEvent(id) {
            EventService.getEvent(id).then(
                function(data) {
                    vm.evt = data;
                    $location.path('/eventDetails');
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function createEvent(evt) {
            EventService.createEvent(evt).then(
                getAllEvents,
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function updateEvent(evt) {
            EventService.updateEvent(evt).then(
                getAllEvents,
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function submit() {
            vm.createEvent(vm.evt);
            vm.reset();
        }

        function reset() {
            vm.evt = {};
            $scope.eventForm.$setPristine();
        }

        function edit(id) {
            for (var i = 0; i < vm.events.length; i++) {
                if (vm.events[i].eventId === id) {
                    vm.evt = angular.copy(vm.events[i]);
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