(function () {
    'use strict';

    angular.module('mainApp').factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/user/';
        var service = {};

        service.getAllUsers = getAllUsers;
        service.getUserById = getUserById;
        service.getUserByUsername = getUserByUsername;
        service.register = register;
        service.update = update;
        service.remove = remove;

        return service;

        function getAllUsers() {
            return $http.get(BASE_URL).then(
                    handleSuccess,
                    handleError('Error Getting Users')
            );
        }

        function getUserById(id) {
            return $http.get(BASE_URL + 'id/' + id).then(
                    handleSuccess,
                    handleError('Error Getting User with Id: ' + id)
            );
        }
        
        function getUserByUsername(username) {
            return $http.get(BASE_URL + 'uname/' + username).then(
                    handleSuccess,
                    handleError('Error Getting User with Username: ' + username)
            );
        }
        
        function register(user) {
            return $http.post(BASE_URL, user).then(
                    function(response) {
                        return {success: true};
                    },
                    handleError('Error Registering User: ' + user)
            );
        }
        
        function update(user) {
            return $http.put(BASE_URL + user.userId, user).then(
                    handleSuccess,
                    handleError('Error Updating User with Id: ' + user.userId)
            );
        }
        
        function remove(id) {
            return $http.delete(BASE_URL + id).then(
                    handleSuccess,
                    handleError('Error Removing User with Id: ' + id)
            );
        }
        
        function handleSuccess(response) {
            return response.data;
        }
        
        function handleError(message) {
            return {
                success: false,
                message: message
            };
        }

    }
})();
