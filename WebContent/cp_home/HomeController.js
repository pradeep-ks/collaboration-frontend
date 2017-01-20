(function() {
'use strict';

    angular
        .module('MainApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', 'UserService'];
    function HomeController($rootScope, UserService) {
        var vm = this;
        vm.User = null;
        vm.Users = [];

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