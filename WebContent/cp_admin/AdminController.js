(function() {
'use strict';

    console.log('Inside AdminController.js');

    angular
        .module('MainApp')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope', '$location', 'UserService', 'BlogService', 'JobService'];
    function AdminController($rootScope, $location, UserService, BlogService, JobService) {
        var vm = this;
        vm.users = [];
        vm.blogs = [];
        vm.jobs = [];

        /** function to retrieve list of all users. */
        vm.getAllUsers = function () {
            console.log('Inside AdminController::getAllUsers()....');
            UserService.getAllUsersExceptLoggedIn().then(
                function (data) {
                    vm.users = data;
                },
                function (errResponse) {
                    console.error('Error Getting List of Users');
                }
            );
        };

        /** function to retrieve list of all newly created blogs. */
        vm.getNewBlogs = function () {
            console.log('Inside AdminController::getNewBlogs()....');
            BlogService.getNewBlogs().then(
                function (data) {
                    vm.blogs = data;
                },
                function (errResponse) {
                    console.error('Error Getting Newly Created Blogs!');
                }
            );
        };

        /** function to retrieve list of all jobs. */
        vm.getAllJobs = function () {
            console.log('Inside AdminController::getAllJobs()....');
            JobService.getAllJobs().then(
                function (data) {
                    vm.jobs = data;
                },
                function (errResponse) {
                    console.error('Error Getting List of Jobs!');
                }
            );
        };

        /** function to enable a newly registered user. */
        vm.enableUser = function (userId) {
            console.log('Inside AdminController::enableUser()....');
            UserService.enableUser(userId).then(
                vm.getAllUsers,
                function (errResponse) {
                    console.error('Error Enabling User with Id: ' + userId);
                }
            );
        };

        /** function to disable a newly registered user. */
        vm.disableUser = function (userId) {
            console.log('Inside AdminController::disableUser()....');
            UserService.disableUser(userId).then(
                vm.getAllUsers,
                function (errResponse) {
                    console.error('Error Disabling User with Id: ' + userId);
                }
            );
        };

        /** function to make a standard user as Admin. */
        vm.makeAdmin = function (userId) {
            console.log('Inside AdminController::makeAdmin()....');
            UserService.makeAdmin(userId).then(
                vm.getAllUsers,
                function (errResponse) {
                    console.error('Error Making User as Admin');
                }
            );
        };

        /** function to approve a newly created blog. */
        vm.approveBlog = function (blogId) {
            console.log('Inside AdminController::approveBlog()....');
            BlogService.approveBlog(blogId).then(
                vm.getNewBlogs,
                function (errResponse) {
                    console.error('Error Approving Blog!!!');
                }
            );
        };

        /** function to reject a newly created blog. */
        vm.rejectBlog = function (blogId) {
            console.log('Inside AdminController::rejectBlog()....');
            BlogService.rejectBlog(blogId).then(
                vm.getNewBlogs,
                function (errResponse) {
                    console.error('Error Rejecting Blog!');
                }
            );
        };

        /** function to post a new job. */
        vm.postNewJob = function (job) {
            console.log('Inside AdminController::postNewJob()....');
            JobService.createJob(job).then(
                vm.getAllJobs,
                function (errResponse) {
                    console.error('Error Posting New Job!');
                }
            );
        };

        /** function to update an existing job. */
        vm.updateJob = function (job) {
            console.log('Inside AdminController::updateJob()....');
            JobService.updateJob(job).then(
                vm.getAllJobs,
                function (errResponse) {
                    console.error('Error Updating Job!');
                }
            );
        };

        /** function to edit an existing job for updation. */
        vm.edit = function (jobId) {
            console.log('Inside AdminController::edit()....');
            for (var index = 0; index < vm.jobs.length; index++) {
                if (vm.jobs[index].jobId === jobId) {
                    vm.job = angular.copy(vm.jobs[index]);
                    break;
                }
            }
        };

        /** initialize function called when the controller gets loaded. */
        activate();

        ////////////////

        function activate() {
            console.log('Inside AdminController::activate()....');
            vm.getNewBlogs();
            vm.getAllJobs();
            vm.getAllUsers();
        }
    }
})();