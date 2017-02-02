(function () {
    'use strict';

    angular.module('MainApp').factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/user/';
        var service = {
            getAllUsers: getAllUsers,
            getUserById: getUserById,
            getUserByUsername: getUserByUsername,
            registerUser: registerUser,
            updateUser: updateUser,
            removeUser: removeUser,
            getAllUsersExceptLoggedIn: getAllUsersExceptLoggedIn,
            logout: logout,
            enableUser: enableUser,
            disableUser: disableUser,
            makeAdmin: makeAdmin
        };

        return service;

        function getAllUsers() {
            return $http.get(BASE_URL + 'all/').then(handleSuccess, handleError('Error Getting Users'));
        }

        function getUserById(id) {
            return $http.get(BASE_URL + 'id/' + id).then(handleSuccess, handleError('Error Getting User with Id: ' + id));
        }
        
        function getUserByUsername(username) {
            return $http.get(BASE_URL + 'uname/' + username).then(handleSuccess, handleError('Error Getting User with Username: ' + username));
        }
        
        function registerUser(User) {
            return $http.post(BASE_URL, User).then(handleCreateSuccess, handleError('Error Registering User: ' + User));
        }
        
        function updateUser(User) {
            return $http.put(BASE_URL + User.userId, User).then(handleSuccess, handleError('Error Updating User with Id: ' + User.userId));
        }
        
        function removeUser(id) {
            return $http.delete(BASE_URL + id).then(handleSuccess, handleError('Error Removing User with Id: ' + id));
        }
        
        function getAllUsersExceptLoggedIn() {
        	return $http.get(BASE_URL + 'others/').then(handleSuccess, handleError('Error Getting Other Users'));
        }
        
        function logout(userId) {
        	return $http.put(BASE_URL + 'logout/').then(handleSuccess, handleError('Error Logging Out'));
        }

        function enableUser(userId) {
            return $http.put(BASE_URL + 'enable/' + userId).then(handleSuccess, handleError('Error Enabling User'));
        }

        function disableUser(userId) {
            return $http.put(BASE_URL + 'disable/' + userId).then(handleSuccess, handleError('Error Disabling User'));
        }

        function makeAdmin(userId) {
            return $http.put(BASE_URL + 'makeAdmin/' + userId).then(handleSuccess, handleError('Error Promoting User As Admin'));
        }
        
        function handleSuccess(response) {
            return response.data;
        }

        function handleCreateSuccess(response) {
            var res = {success: true};
            return res;
        }
        
        function handleError(message) {
            return function() {
                return {success: false, message: message};
            };
        }

    }
})();
