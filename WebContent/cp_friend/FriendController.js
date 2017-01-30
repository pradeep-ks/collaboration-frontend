(function() {
'use strict';

    angular
        .module('MainApp')
        .controller('FriendController', FriendController);

    FriendController.$inject = ['$scope', '$location', '$rootScope', 'FriendService', 'UserService', 'MsgService'];
    function FriendController($scope, $location, $rootScope, FriendService, UserService, MsgService) {
        var vm = this;
        vm.Friend = null;
        vm.User = null;
        vm.Friends = [];
        vm.Users = [];
        vm.FriendRequests = [];
        
        vm.sendFriendRequest = sendFriendRequest;
        vm.getMyFriends = getMyFriends;
        //vm.updateFriendRequest = updateFriendRequest;
        vm.getAllUsers = getAllUsers;
        vm.acceptFriendRequest = acceptFriendRequest;
        vm.rejectFriendRequest = rejectFriendRequest;
        vm.startChat = startChat;

        activate();

        function activate() {
            getAllUsers();
            getMyFriends();
            getMyFriendRequests();
        }

        function getAllUsers() {
            UserService.getAllUsersExceptLoggedIn().then(
                function(data) {
                	console.log('Other Users....');
                	console.log(data);
                    vm.Users = data;
                },
                function(errResponse) {
                    MsgService.failure(errResponse, false);
                }
            );
        }

        function sendFriendRequest(friendId) {
            FriendService.sendFriendRequest(friendId).then(
                function(data) {
                    vm.Friend = data;
                    MsgService.success('Friend Request Sent Successfully!');
                },
                function(errResponse) {
                    MsgService.failure(errResponse, false);
                }
            );
        }

        function getMyFriends() {
            FriendService.getMyFriends().then(
                function(data) {
                    vm.FriendRequests = data;
                },
                function(errResponse) {
                    MsgService.failure(errResponse, false);
                }
            );
        }

        function getMyFriendRequests() {
            FriendService.getMyNewFriendRequests().then(
                function(data) {
                    vm.FriendRequests = data;
                },
                function(errResponse) {
                    MsgService.failure(errResponse, false);
                }
            );
        }

        function acceptFriendRequest(friendId) {
            FriendService.acceptFriendRequest(friendId).then(
                function(data) {
                    // vm.FriendRequests = data;
                	getMyFriendRequests();
                },
                function(errResponse) {
                    MsgService.failure(errResponse, false);
                }
            );
        }

        function rejectFriendRequest(friendId) {
            FriendService.rejectFriendRequest(friendId).then(
                function(data) {
                    // vm.FriendRequests = data;
                    getMyFriendRequests();
                },
                function(errResponse) {
                    MsgService.failure(errResponse, false);
                }
            );
        }
        
        function startChat(friendName) {
        	console.log('Inside FriendController::startChat()....');
        	$rootScope.friendName = friendName;
        	$location.path('/private-chat');
        }
    }
})();