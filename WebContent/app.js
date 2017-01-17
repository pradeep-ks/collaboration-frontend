(function () {
    'use strict';

    angular.module('mainApp', ['ngRoute', 'ngCookies']).config(config).run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        console.log('Inside config()');
        $routeProvider.when('/', {
            templateUrl: 'cp_home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        }).when('/login', {
            templateUrl: 'cp_user/login.html',
            controller: 'UserController',
            controllerAs: 'vm'
        }).when('/register', {
            templateUrl: 'cp_user/register.html',
            controller: 'UserController',
            controllerAs: 'vm'
        }).when('/chat', {
            templateUrl: 'cp_chat/chat.html',
            controller: 'ChatController',
            controllerAs: 'vm'
        }).when('/view-blogs', {
            templateUrl: 'cp_blog/view-blogs.html',
            controller: 'BlogController',
            controllerAs: 'vm'
        }).when('/blog-details', {
            templateUrl: 'cp_blog/blog-details.html',
            controller: 'BlogController',
            controllerAs: 'vm'
        }).when('/create-blog', {
            templateUrl: 'cp_blog/create-blog.html',
            controller: 'BlogController',
            controllerAs: 'vm'
        }).when('/view-events', {
            templateUrl: 'cp_event/view-events.html',
            controller: 'EventController',
            controllerAs: 'vm'
        }).when('/event-details', {
            templateUrl: 'cp_event/event-details.html',
            controller: 'EventController',
            controllerAs: 'vm'
        }).when('/create-event', {
            templateUrl: 'cp_event/create-event.html',
            controller: 'EventController',
            controllerAs: 'vm'
        }).when('/view-jobs', {
            templateUrl: 'cp_job/view-jobs.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).when('/job-details', {
            templateUrl: 'cp_job/job-details.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).when('/create-job', {
            templateUrl: 'cp_job/create-job.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).when('/apply-job', {
            templateUrl: 'cp_job/apply-job.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).otherwise({
            redirectTo: '/login'
        });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$timeout'];
    function run($rootScope, $location, $cookies, $http, $timeout) {
        console.log('Inside run()');
        $rootScope.loggedInUser = $cookies.getObject('loggedInUser') || {};
        if ($rootScope.loggedInUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.loggedInUser;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log('Inside $on() event listener');
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.loggedInUser.username;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
})();
