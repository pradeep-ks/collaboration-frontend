(function() {
'use strict';

    angular
        .module('MainApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$location', 'UserService', 'AuthService'];
    function HomeController($rootScope, $location, UserService, AuthService) {
        var vm = this;
        vm.User = null;
        vm.Users = [];
        vm.logout = function () {
        	console.log('Logging Out....');
        	AuthService.logout().then(
        		function (response) {
        			if (response.success) {
        				alert('You Logged Out Successfully!');
        				AuthService.clearCredentials();
        				$location.path('/login');
        			}
        		},
        		function (errResponse) {
        			alert('Error Logging Out, Redirecting to login page....');
        			AuthService.clearCredentials();
        			$location.path('/login');
        		}
        	);
        };

        activate();
        
        function activate() {
            loadLoggedInUser();
            loadRegisteredUsers();
        }

        function loadLoggedInUser() {
            console.log('Setting Logged In User...');
            console.log($rootScope.loggedInUser);
            vm.User = $rootScope.loggedInUser;
        }

        function loadRegisteredUsers() {
            UserService.getAllUsers().then(
                function(data) {
                    vm.Users = data;
                },
                function(error) {
                    console.error(error.message);
                }
            );
        }
    }
})();