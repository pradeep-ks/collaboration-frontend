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
            $http.post('http://localhost:10080/collaboration-restbackend/user/auth', {username: username, password: password}).then(
                function(response) {
                	console.log(response.data);
                    var res = {data: response.data, success: true};
                    callback(res);
                }, function(errResponse) {
                    console.error('Error Logging In');
                }
            );
        };

        service.setCredentials = function(User) {
            console.log('Setting User Credentials...' + User);
            $rootScope.loggedInUser = User;

            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope;

            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 3);
            $cookies.putObject('loggedInUser', $rootScope.loggedInUser, {expire: expireDate});
        };
        
        return service;
    }
})();