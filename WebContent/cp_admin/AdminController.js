(function() {
'use strict';

    angular
        .module('MainApp')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope', '$location', 'UserService', 'BlogService', 'JobService'];
    function AdminController($rootScope, $location, UserService, BlogService, JobService) {
        var vm = this;
        vm.users = [];
        vm.blogs = [];
        vm.jobs = [];

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

        vm.enableUser = function (userId) {
            console.log('Inside AdminController::enableUser()....');
            UserService.enableUser(userId).then(
                getAllUsers,
                function (errResponse) {
                    console.error('Error Enabling User with Id: ' + userId);
                }
            );
        };

        vm.disableUser = function (userId) {
            console.log('Inside AdminController::disableUser()....');
            UserService.disableUser(userId).then(
                getAllUsers,
                function (errResponse) {
                    console.error('Error Disabling User with Id: ' + userId);
                }
            );
        };

        vm.makeAdmin = function (userId) {
            console.log('Inside AdminController::makeAdmin()....');
            UserService.makeAdmin(userId).then(
                getAllUsers,
                function (errResponse) {
                    console.error('Error Making User as Admin');
                }
            );
        };

        vm.approveBlog = function (blogId) {
            console.log('Inside AdminController::approveBlog()....');
            BlogService.approveBlog(blogId).then(
                getNewBlogs,
                function (errResponse) {
                    console.error('Error Approving Blog!!!');
                }
            );
        };

        vm.rejectBlog = function (blogId) {
            console.log('Inside AdminController::rejectBlog()....');
            BlogService.rejectBlog(blogId).then(
                getNewBlogs,
                function (errResponse) {
                    console.error('Error Rejecting Blog!');
                }
            );
        };

        vm.postNewJob = function (job) {
            console.log('Inside AdminController::postNewJob()....');
            JobService.createJob(job).then(
                getAllJobs,
                function (errResponse) {
                    console.error('Error Posting New Job!');
                }
            );
        };

        vm.updateJob = function (job) {
            console.log('Inside AdminController::updateJob()....');
            JobService.updateJob(job).then(
                getAllJobs,
                function (errResponse) {
                    console.error('Error Updating Job!');
                }
            );
        };

        vm.edit = function (jobId) {
            console.log('Inside AdminController::edit()....');
            for (var index = 0; index < vm.jobs.length; index++) {
                if (vm.jobs[index].jobId === jobId) {
                    vm.job = angular.copy(vm.jobs[index]);
                    break;
                }
            }
        };

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