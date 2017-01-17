(function () {
    'use strict';

    angular.module('mainApp').controller('UserController', UserController);

    UserController.$inject = ['UserService', '$rootScope', '$location', 'AuthService'];
    function UserController(UserService, $rootScope, $location, AuthService) {
        var vm = this;
        vm.user = {
            userId: null,
            username: '',
            email: '',
            password: '',
            role: '',
            active: ''
        };
        vm.login = function() {
            vm.dataLoading = true;
            AuthService.login(vm.user.username, vm.user.password, function(response) {
                console.log(response);
                if (response.success) {
                    console.log('Setting User Credentials...');
                    AuthService.setCredentials(response.data);
                    console.log('Redirectng to home...');
                    $location.path('/');
                } else {
                    console.error('Error Authenticating User with name: ' + vm.user.username);
                    vm.dataLoading = false;
                }
            });
        };
        vm.register = function () {
            vm.dataLoading = true;
            console.log(vm.user);
            UserService.register(vm.user).then(
                    function (response) {
                        if (response.success) {
                            console.log('Registration Successful');
                            $location.path('/');
                        } else {
                            console.error('Error Registering User');
                            vm.dataLoading = false;
                        }
                    }
            );
        };
    }
})();