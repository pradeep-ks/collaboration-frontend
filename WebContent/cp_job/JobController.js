(function() {
'use strict';

    angular
        .module('mainApp')
        .controller('JobController', JobController);

    JobController.$inject = ['$scope', '$location', '$rootScope', 'JobService'];
    function JobController($scope, $location, $rootScope, JobService) {
        var vm = this;
        vm.Job = null;
        vm.Jobs = [];

        vm.listJobs = function() {
            JobService.getAllJobs().then(
                function(data) {
                    vm.Jobs = data;
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        };

        vm.getJob = function(jobId) {
            JobService.getJob(jobId).then(
                function(data) {
                    vm.Job = data;
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        };

        vm.createJob = function(Job) {
            JobService.createJob(Job).then(
                vm.listJobs,
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        };

        vm.updateJob = function(Job) {
            JobService.updateJob(job).then(
                vm.listJobs,
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        };

        vm.applyJob = function(jobId) {
            var User = $rootScope.loggedInUser;
            if (typeof User.userId == 'undefined') {
                alert('You Must Log In To Apply For Job!');
                $location.path('/login');
            }

            JobService.applyJob(jobId).then(
                function(data) {
                    vm.Job = data;
                    alert('You Successfully Applied For The Job!');
                },
                function(errResponse) {
                    console.error(errResponse);
                }
            );
        }

        vm.edit = function(jobId) {
            for (var i = 0; i < vm.Jobs.length; i++) {
                if (vm.Jobs[i].jobId === jobId) {
                    vm.Job = angular.copy(vm.Jobs[i]);
                    break;
                }
            }
        };

        activate();

        function activate() {
            vm.listJobs();
        }
    }
})();