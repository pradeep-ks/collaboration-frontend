(function () {
    'use strict';
    console.log('Inside UserController.js');
    angular.module('MainApp').controller('UserController', UserController);

    UserController.$inject = ['UserService', '$location', 'AuthService', 'MsgService'];
    function UserController(UserService, $location, AuthService, MsgService) {
        var vm = this;
        vm.User = null;
        vm.Users = [];
        vm.login = login;
        vm.register = register;
        
        (function init() {
            AuthService.clearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthService.login(vm.User.username, vm.User.password, function(response) {
                console.log(response);
                if (response.success) {
                    AuthService.setCredentials(response.data);
                    $location.path('/');
                } else {
                    console.error('Error Authenticating User with name: ' + vm.User.username);
                    MsgService.failure(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        function register() {
            vm.dataLoading = true;
            console.log(vm.User);
            UserService.registerUser(vm.User).then(
                    function (response) {
                        if (response.success) {
                            console.log('Registration Successful');
                            MsgService.success('Registration Successful', true);
                            $location.path('/login');
                        } else {
                            console.error('Error Registering User');
                            MsgService.failure(response.message);
                            vm.dataLoading = false;
                        }
                    }
            );
        }
    }
})();