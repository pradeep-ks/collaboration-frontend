(function() {
'use strict';

    angular
        .module('mainApp')
        .factory('MsgService', MsgService);

    MsgService.inject = ['$rootScope'];
    function MsgService($rootScope) {
        var service = {};

        service.success = function(message, keepAfterLocationChange) {
            $rootScope.flashMsg = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        };

        service.failure = function(message, keepAfterLocationChange) {
            $rootScope.flashMsg = {
                message: message,
                type: 'failure',
                keepAfterLocationChange: keepAfterLocationChange
            };
        };
        
        (function() {
            $rootScope.$on('$locationChangeStart', function() {
                clearMessages();
            });

            function clearMessages() {
                var flashMsg = $rootScope.flashMsg;
                if (flashMsg) {
                    if (!flashMsg.keepAfterLocationChange) {
                        delete $rootScope.flashMsg;
                    } else {
                        flashMsg.keepAfterLocationChange = false;
                    }
                }
            }
        })();

        return service;
    }
})();