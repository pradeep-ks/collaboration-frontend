(function() {
'use strict';

    angular
        .module('mainApp')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};

        service.login = function(username, password, callback) {
            console.log('Inside AuthService::login()....');
            $http.post('http://localhost:9080/collaboration-restbackend/user/auth', {username: username, password: password}).then(
                function(response) {
                	console.log(response.data);
                    var res = {data: response.data, success: true};
                    callback(res);
                }, function(errResponse) {
                    console.error('Error Logging In');
                }
            );
        };

        service.setCredentials = function(user) {
            console.log('Setting User Credentials...' + user);
            $rootScope.loggedInUser = user;
            /*UserService.getUserByUsername(username).then(
                function(response) {
                    console.log(response.data);
                    $rootScope.loggedInUser = response.data;
                }
            );*/
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope;

            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 3);
            $cookies.putObject('loggedInUser', $rootScope.loggedInUser, {expire: expireDate});
        };
        
        return service;
    }
})();