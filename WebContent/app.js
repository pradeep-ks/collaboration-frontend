var app = angular.module('mainApp', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider'], function($routeProvider, $locationProvider) {
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
    }).when('/viewBlogs', {
        templateUrl: 'cp_blog/viewBlogs.html',
        controller: 'BlogController',
        controllerAs: 'vm'
    }).when('/blogDetails', {
        templateUrl: 'cp_blog/blogDetails.html',
        controller: 'BlogController',
        controllerAs: 'vm'
    }).when('/createBlog', {
        templateUrl: 'cp_blog/createBlog.html',
        controller: 'BlogController',
        controllerAs: 'vm'
    }).when('/viewEvents', {
        templateUrl: 'cp_event/viewEvents.html',
        controller: 'EventController',
        controllerAs: 'vm'
    }).when('/eventDetails', {
        templateUrl: 'cp_event/eventDetails.html',
        controller: 'EventController',
        controllerAs: 'vm'
    }).when('/createEvent', {
        templateUrl: 'cp_event/createEvent.html',
        controller: 'EventController',
        controllerAs: 'vm'
    }).otherwise({
        redirectTo: '/login'
    });
});

app.run(['$rootScope', '$location', '$cookies', '$http', '$timeout'], function($rootScope, $location, $cookies, $http, $timeout) {
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
});
/*
(function () {
    'use strict';

    angular.module('mainApp', ['ngRoute', 'ngCookies']).config(config).run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        console.log('Inside config()');
        $routeProvider.when('/', {
            templateUrl: 'cp_home/home.html',
            controller: 'HomeController'
        }).when('/login', {
            templateUrl: 'cp_user/login.html',
            controller: 'UserController'
        }).when('/register', {
            templateUrl: 'cp_user/register.html',
            controller: 'UserController'
        }).when('/chat', {
            templateUrl: 'cp_chat/chat.html',
            controller: 'ChatController'
        }).when('/viewBlogs', {
            templateUrl: 'cp_blog/viewBlogs.html',
            controller: 'BlogController'
        }).when('/blogDetails', {
            templateUrl: 'cp_blog/blogDetails.html',
            controller: 'BlogController'
        }).when('/createBlog', {
            templateUrl: 'cp_blog/createBlog.html',
            controller: 'BlogController'
        }).when('/viewEvents', {
            templateUrl: 'cp_event/viewEvents.html',
            controller: 'EventController'
        }).when('/eventDetails', {
            templateUrl: 'cp_event/eventDetails.html',
            controller: 'EventController'
        }).when('/createEvent', {
            templateUrl: 'cp_event/createEvent.html',
            controller: 'EventController'
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
*/