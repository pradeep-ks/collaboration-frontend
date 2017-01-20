(function() {
    'use strict';
    console.log('Inside main-app.js');
    angular.module('MainApp', ['ngRoute', 'ngCookies']).config(config).run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
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
        }).when('/list-blogs', {
            templateUrl: 'cp_blog/list-blogs.html',
            controller: 'BlogController',
            controllerAs: 'vm'
        }).when('/blog-details', {
            templateUrl: 'cp_blog/blog-details.html',
            controller: 'BlogController',
            controllerAs: 'vm'
        }).when('/new-blog', {
            templateUrl: 'cp_blog/new-blog.html',
            controller: 'BlogController',
            controllerAs: 'vm'
        }).when('/list-events', {
            templateUrl: 'cp_event/list-events.html',
            controller: 'EventController',
            controllerAs: 'vm'
        }).when('/event-details', {
            templateUrl: 'cp_event/event-details.html',
            controller: 'EventController',
            controllerAs: 'vm'
        }).when('/new-event', {
            templateUrl: 'cp_event/new-event.html',
            controller: 'EventController',
            controllerAs: 'vm'
        }).when('/chat', {
            templateUrl: 'cp_chat/chat.html',
            controller: 'ChatController',
            controllerAs: 'vm'
        }).when('/list-jobs', {
            templateUrl: 'cp_job/list-jobs.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).when('/list-applied-jobs', {
            templateUrl: 'cp_job/list-applied-jobs.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).when('/job-details', {
            templateUrl: 'cp_job//job-details.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).when('/new-job', {
            templateUrl: 'cp_job/new-job.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).when('/apply-job', {
            templateUrl: 'cp_job/apply-job.html',
            controller: 'JobController',
            controllerAs: 'vm'
        }).when('/list-friends', {
            templateUrl: 'cp_friend/list-friends.html',
            controller: 'FriendController',
            controllerAs: 'vm'
        }).when('/find-friends', {
            templateUrl: 'cp_friend/find-friends.html',
            controller: 'FriendController',
            controllerAs: 'vm'
        }).when('/view-friend-requests', {
            templateUrl: 'cp_friend/view-friend-requests.html',
            controller: 'FriendController',
            controllerAs: 'vm'
        }).otherwise({
            redirectTo: '/login'
        });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        console.log('Inside run()....');
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            console.log('Inside run()::$on()....');
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/list-blogs', '/blog-details', '/list-events', '/event-details', '/list-jobs', 'job-details']) === -1;
            var loggedIn = $rootScope.loggedInUser.username;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });

        $rootScope.loggedInUser = $cookies.getObject('loggedInUser') || {};
        if ($rootScope.loggedInUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.loggedInUser;
        }
    }
})();