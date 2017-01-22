(function() {
'use strict';

    angular
        .module('MainApp')
        .factory('FriendService', FriendService);

    FriendService.$inject = ['$http'];
    function FriendService($http) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/user/';
        var service = {
            sendFriendRequest:sendFriendRequest,
            getMyFriends: getMyFriends,
            getMyNewFriendRequests: getMyNewFriendRequests,
            acceptFriendRequest: acceptFriendRequest,
            rejectFriendRequest: rejectFriendRequest
        };
        
        return service;

        function sendFriendRequest(friendId) {
            return $http.get(BASE_URL + 'sendRequest/' + friendId).then(
                handleSuccess, handleError('Error Sending Friend Request')
            );
        }

        function getMyFriends() {
            return $http.get(BASE_URL + 'friends/').then(
                handleSuccess, handleError('Error Getting Your Friends')
            );
        }

        function getMyNewFriendRequests() {
            return $http.get(BASE_URL + 'newFriendRequests/').then(
                handleSuccess, handleError('Error Getting New Friend Requests')
            );
        }

        function acceptFriendRequest(friendId) {
            return $http.get(BASE_URL + 'accept/' + friendId).then(
                handleSuccess, handleError('Error Accepting Friend Requests')
            );
        }

        function rejectFriendRequest(friendId) {
            return $http.get(BASE_URL + 'reject/' + friendId).then(
                handleSuccess, handleError('Error Rejecting Friend Requests')
            );
        }

        function handleSuccess(response) {
            return response.data;
        }

        function handleError(message) {
            var errRes = {
                message: message,
                success: false
            };
            return errRes;
        }
    }
})();