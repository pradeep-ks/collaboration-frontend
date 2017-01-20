(function() {
'use strict';
console.log('Inside AuthService.js');
    angular
        .module('MainApp')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {
            login: login,
            setCredentials: setCredentials,
            clearCredentials: clearCredentials
        };

        return service;

        function login(username, password, callback) {
            console.log('Inside AuthService::login()....');
            $http.post('http://localhost:10080/collaboration-restbackend/user/auth/', {username: username, password: password}).then(
                function(response) {
                    var res = {
                        data: response.data,
                        success: true
                    };
                    callback(res);
                }, function(errResponse) {
                    console.error('Error Logging In');
                    alert('Error Logging In!');
                }
            );
        }

        function setCredentials(User) {
            console.log('Inside AuthService::setCredentials()....');
            $rootScope.loggedInUser = User;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.loggedInUser;

            // Set cookies
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 3);
            $cookies.putObject('loggedInUser', $rootScope.loggedInUser, {expire: expireDate});
        }

        function clearCredentials() {
            console.log('Inside AuthService::clearCredentials()....');
            $rootScope.globals = {};
            $rootScope.loggedInUser = {};
            $cookies.remove('loggedInUser');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }
})();