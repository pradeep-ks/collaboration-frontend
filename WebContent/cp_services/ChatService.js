(function() {
'use strict';

	angular
		.module('MainApp')
		.service('ChatService', ChatService);

	ChatService.inject = ['$q', '$timeout', '$rootScope'];
	function ChatService($q, $timeout, $rootScope) {
		var User = $rootScope.loggedInUser;
		var service = {};
		var listener = $q.defer();
		var socket = {
			client: null,
			stomp: null
		};
		var msgIds = [];
		service.RECONNECT_TIMEOUT = 30000;
		service.SOCKET_URL = '/collaboration-restbackend/chat';
		service.CHAT_TOPIC = '/topic/message';
		service.CHAT_BROKER = '/app/chat';

		service.receive = function() {
			console.log('Inside ChatService::receive()');
			return listener.promise;
		};

		service.send = function(Message) {
			console.log('Inside ChatService::send()');
			var genId = Math.floor(Math.random() * 1000000);
			socket.stomp.send(service.CHAT_BROKER, {
				priority : 9
			}, JSON.stringify({
				id : genId,
				message : Message,
				username : User.username
			}));
			msgIds.push(genId);
		};

		var reconnect = function() {
			console.log('Inside ChatService::reconnect()....');
			$timeout(function() {
				initialize();
			}, this.RECONNECT_TIMEOUT);
		};

		var getMessage = function(data) {
			console.log('Inside ChatService::getMessage()....');
			var Message = JSON.parse(data);
			var outMsg = {};

			outMsg.message = Message.message;
			outMsg.username = Message.username;
			outMsg.time = new Date(Message.time);

			return outMsg;
		};

		var startListener = function() {
			console.log('Inside ChatService::startListener()....');
			socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
				listener.notify(getMessage(data.body));
			});
		};

		var initialize = function() {
			console.log('Inside ChatService::initialize()....');
			socket.client = new SockJS(service.SOCKET_URL);
			socket.stomp = Stomp.over(socket.client);
			socket.stomp.connect({}, startListener);
			socket.stomp.onclose = reconnect;
		};

		initialize();

		return service;
	}
})();
