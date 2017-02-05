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
        })
        /** Admin related url mappings */
        .when('/manage-users', {
        	templateUrl: 'cp_admin/manage-users.html',
        	controller: 'AdminController',
        	controllerAs: 'vm'
        }).when('/manage-blogs', {
        	templateUrl: 'cp_admin/manage-blogs.html',
        	controller: 'AdminController',
        	controllerAs: 'vm'
        }).when('/manage-jobs', {
        	templateUrl: 'cp_admin/manage-jobs.html',
        	controller: 'AdminController',
        	controllerAs: 'vm'
        }).when('/manage-events', {
        	templateUrl: 'cp_admin/manage-events.html',
        	controller: 'AdminController',
        	controllerAs: 'vm'
        })
        /** User related url mappings */
        .when('/login', {
            templateUrl: 'cp_user/login.html',
            controller: 'UserController',
            controllerAs: 'vm'
        }).when('/register', {
            templateUrl: 'cp_user/register.html',
            controller: 'UserController',
            controllerAs: 'vm'
        })
        /** Group chat related url mappings */
        .when('/chat', {
            templateUrl: 'cp_chat/chat.html',
            controller: 'ChatController',
            controllerAs: 'vm'
        })
        /** Blog related url mappings */
        .when('/view-blogs', {
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
        })
        /** Event related url mappings */
        .when('/view-events', {
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
        })
        /** Job related url mappings */
        .when('/view-jobs', {
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
        })
        /** Friend related url mappings */
        .when('/list-friends', {
        	templateUrl: 'cp_friend/list-friends.html',
        	controller: 'FriendController',
        	controllerAs: 'vm'
        }).when('/view-friend-requests', {
        	templateUrl: 'cp_friend/view-friend-requests.html',
        	controller: 'FriendController',
        	controllerAs: 'vm'
        }).when('/find-friends', {
        	templateUrl: 'cp_friend/find-friends.html',
        	controller: 'FriendController',
        	controllerAs: 'vm'
        })
        /** Private chat related url mappings */
        .when('/private-chat', {
        	templateUrl: 'cp_private_chat/private-chat.html',
        	controller: 'PrChatController',
        	controllerAs: 'vm'
        })
        /** Default url mappings */
        .otherwise({
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
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/view-blogs', '/blog-details', '/view-events', '/event-details', '/view-jobs', 'job-details']) === -1;
            var loggedIn = $rootScope.loggedInUser.username;
            if (!loggedIn) {
            	if (restrictedPage) {
            		$location.path('/login');
            	}
            } else {
            	var role = $rootScope.loggedInUser.role;
            	var adminPage = $.inArray($location.path(), ['/manage-users', '/manage-blogs', '/manage-jobs']) === 0;
            	if (adminPage && role != 'ADMIN') {
            		alert('You Are Not Authorized To Visit This Page!');
            		$location.path('/');
            	}
            }
        });
    }
})();
