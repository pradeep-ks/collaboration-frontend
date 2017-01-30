(function() {
'use strict';

	angular
		.module('MainApp')
		.controller('PrChatController', PrChatController);

	PrChatController.$inject = ['$scope', 'ChatService'];
	function PrChatController($scope, PrChatService) {
		$scope.Messages = [];
		$scope.Message = '';
		$scope.MAX_LEN = 200;

		$scope.sendMessage = function() {
			PrChatService.send($scope.Message);
			$scope.Message = '';
		};

		PrChatService.receive().then(null, null, function(Message) {
			$scope.Messages.push(Message);
		});
	}
})();
