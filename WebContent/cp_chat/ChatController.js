angular.module('mainApp').controller('ChatController',
		function($scope, ChatService) {
			$scope.messages = [];
			$scope.message = '';
			$scope.MAX_LEN = 200;

			$scope.sendMessage = function() {
				console.log('Inside ChatController::sendMessage()...');
				ChatService.send($scope.message);
				$scope.message = '';
			};

			ChatService.receive().then(null, null, function(message) {
				console.log('Inside ChatController::ChatService.receive()...');
				$scope.messages.push(message);
			});
		});
