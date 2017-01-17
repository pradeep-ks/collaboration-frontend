(function() {
'use strict';

    angular
        .module('mainApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', 'UserService'];
    function HomeController($rootScope, UserService) {
        var vm = this;
        vm.user = null;
        vm.users = [];


        activate();
        function activate() {
            loadLoggedInUser();
            //loadRegisteredUsers();
        }

        function loadLoggedInUser() {
            console.log('Setting Logged In User...');
            console.log($rootScope.loggedInUser);
            vm.user = $rootScope.loggedInUser;
        }
    }
})();