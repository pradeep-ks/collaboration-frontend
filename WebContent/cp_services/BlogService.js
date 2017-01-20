(function() {
'use strict';

    angular
        .module('MainApp')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['$http', '$q', '$rootScope'];
    function BlogService($http, $q, $rootScope) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/blog/';
        var service = {};

        service.getAllBlogs = function() {
            return $http.get(BASE_URL).then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.getBlogById = function(id) {
            return $http.get(BASE_URL + id).then(
            	function(response) {
                    console.log(response.data);
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.create = function(Blog) {
            return $http.post(BASE_URL, Blog).then(
                function(response) {
                    return {success: true};
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.update = function(Blog) {
            return $http.put(BASE_URL + Blog.blogId, Blog).then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.remove = function(id) {
            return $http.delete(BASE_URL + id).then(
                function(response) {
                    return {success: true};
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        return service;
    }
})();