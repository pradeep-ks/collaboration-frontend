(function() {
	'use strict';

	console.log('Inside FriendService.js');
	
	angular.module('MainApp').factory('FriendService', FriendService);

	FriendService.$inject = [ '$http', '$q' ];
	function FriendService($http, $q) {
		var BASE_URL = 'http://localhost:10080/collaboration-restbackend/user/';
		var service = {
			sendFriendRequest : sendFriendRequest,
			getMyFriends : getMyFriends,
			getMyNewFriendRequests : getMyNewFriendRequests,
			acceptFriendRequest : acceptFriendRequest,
			rejectFriendRequest : rejectFriendRequest
		};

		return service;

		function sendFriendRequest(friendId) {
			console.log('FriendService::sendFriendRequest()....');
			return $http.get(BASE_URL + 'sendRequest/' + friendId).then(
					function(response) {
						console.log(response.data);
						return response.data;
					}, function(errResponse) {
						console.error('Error Sending Friend Request To: ' + friendId);
						return $q.reject(errResponse);
					});
		}

		function getMyFriends() {
			console.log('FriendService::getMyFriends()....');
			return $http.get(BASE_URL + 'friends/').then(function(response) {
				console.log(response.data);
				return response.data;
			}, function(errResponse) {
				return $q.reject(errResponse);
			});
		}

		function getMyNewFriendRequests() {
			console.log('FriendService::getMyNewFriendRequests()....');
			return $http.get(BASE_URL + 'newFriendRequests/').then(
					function(response) {
						console.log(response.data);
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		}

		function acceptFriendRequest(friendId) {
			console.log('FriendService::acceptFriendRequest()....');
			return $http.get(BASE_URL + 'accept/' + friendId).then(
					function(response) {
						console.log(response.data);
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		}

		function rejectFriendRequest(friendId) {
			console.log('FriendService::rejectFriendRequest()....');
			return $http.get(BASE_URL + 'reject/' + friendId).then(
					function(response) {
						console.log(response.data);
						return response.data;
					}, function(errResponse) {
						return $q.reject(errResponse);
					});
		}
	}
})();