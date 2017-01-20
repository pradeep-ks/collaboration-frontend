(function() {
'use strict';

    angular
        .module('MainApp')
        .factory('MsgService', MsgService);

    MsgService.$inject = ['$rootScope'];
    function MsgService($rootScope) {
        var service = {
            success: success,
            failure: failure
        };

        initService();

        return service;

        function success(message, keepAfterLocationChange) {
            $rootScope.FlashMsg = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function failure(message, keepAfterLocationChange) {
            $rootScope.FlashMsg = {
                message: message,
                type: 'failure',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
        
        function initService() {
            $rootScope.$on('$locationChangeStart', function() {
                clearFlashMessages();
            });

            function clearFlashMessages() {
                var FlashMsg = $rootScope.FlashMsg;
                if (FlashMsg) {
                    if (!FlashMsg.keepAfterLocationChange) {
                        delete $rootScope.FlashMsg;
                    } else {
                        FlashMsg.keepAfterLocationChange = false;
                    }
                }
            }
        }
        
    }
})();