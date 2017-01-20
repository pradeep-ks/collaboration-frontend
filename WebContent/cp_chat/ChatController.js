(function() {
'use strict';

	angular
		.module('MainApp')
		.controller('ChatController', ChatController);

	ChatController.$inject = ['$scope', 'ChatService'];
	function ChatController($scope, ChatService) {
		$scope.Messages = [];
		$scope.Message = '';
		$scope.MAX_LEN = 200;

		$scope.sendMessage = function() {
			ChatService.send($scope.Message);
			$scope.Message = '';
		};

		ChatService.receive().then(null, null, function(Message) {
			$scope.Messages.push(Message);
		});
	}
})();
