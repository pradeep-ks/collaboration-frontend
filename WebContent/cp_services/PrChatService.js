(function() {
'use strict';

	angular
		.module('MainApp')
		.service('PrChatService', PrChatService);

	PrChatService.inject = ['$q', '$timeout', '$rootScope'];
	function PrChatService($q, $timeout, $rootScope) {
		var User = $rootScope.loggedInUser;
		var friendName = $rootScope.friendName;
		var service = {};
		var listener = $q.defer();
		var socket = {
			client: null,
			stomp: null
		};
		var msgIds = [];
		service.RECONNECT_TIMEOUT = 30000;
		service.SOCKET_URL = '/collaboration-restbackend/prChat';
		service.CHAT_TOPIC = '/queue/message/' + User.username;
		service.CHAT_BROKER = '/app/prChat';

		service.receive = function() {
			console.log('Inside PrChatService::receive()');
			return listener.promise;
		};

		service.send = function(Message) {
			console.log('Inside PrChatService::send()');
			var genId = Math.floor(Math.random() * 1000000);
			socket.stomp.send(service.CHAT_BROKER, {
				priority : 9
			}, JSON.stringify({
				id : genId,
				message : Message,
				username : User.username,
				friendName: friendName
			}));
			msgIds.push(genId);
		};

		var reconnect = function() {
			console.log('Inside PrChatService::reconnect()....');
			$timeout(function() {
				initialize();
			}, this.RECONNECT_TIMEOUT);
		};

		var getMessage = function(data) {
			console.log('Inside PrChatService::getMessage()....');
			var Message = JSON.parse(data);
			var outMsg = {};

			outMsg.message = Message.message;
			outMsg.username = Message.username;
			outMsg.time = new Date(Message.time);

			return outMsg;
		};

		var startListener = function() {
			console.log('Inside PrChatService::startListener()....');
			socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
				listener.notify(getMessage(data.body));
			});
		};

		var initialize = function() {
			console.log('Inside PrChatService::initialize()....');
			socket.client = new SockJS(service.SOCKET_URL);
			socket.stomp = Stomp.over(socket.client);
			socket.stomp.connect({}, startListener);
			socket.stomp.onclose = reconnect;
		};

		initialize();

		return service;
	}
})();
