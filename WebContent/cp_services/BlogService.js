(function() {
'use strict';

    angular
        .module('MainApp')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['$http', '$q', '$rootScope'];
    function BlogService($http, $q, $rootScope) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/blog/';
        var service = {};

        service.getNewBlogs = function() {
            console.log('Inside BlogService::getNewBlogs()....');
            return $http.get(BASE_URL + 'new/').then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.getApprovedBlogs = function() {
            console.log('Inside BlogService::getApprovedBlogs()....');
            return $http.get(BASE_URL + 'approved/').then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.getBlogById = function(id) {
            console.log('Inside BlogService::getBlogById()....');
            return $http.get(BASE_URL + id).then(
            	function(response) {
                    console.log(response.data);
                    $rootScope.selectedBlog = response.data;
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.create = function(Blog) {
            console.log('Inside BlogService::create()....');
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
            console.log('Inside BlogService::update()....');
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
            console.log('Inside BlogService::remove()....');
            return $http.delete(BASE_URL + id).then(
                function(response) {
                    return {success: true};
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.approveBlog = function (blogId) {
            console.log('Inside BlogService::approveBlog()....');
            return $http.put(BASE_URL + 'approve/' + blogId).then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.rejectBlog = function (blogId) {
            console.log('Inside BlogService::rejectBlog()....');
            return $http.put(BASE_URL + 'reject/' + blogId).then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse);
                }
            );
        };

        service.makeComment = function (comment) {
            console.log('Inside BlogService::makeComment()....');
            return $http.post(BASE_URL + 'comment/' + comment.blog.blogId, comment).then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }

        service.getComments = function (blogId) {
            console.log('Inside BlogService::getComments()....');
            return $http.get(BASE_URL + 'comment/' + blogId).then(
                function (response) {
                	$rootScope.selectedBlogComments = response.data;
                	console.log(selectedBlogComments);
                	return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }

        return service;
    }
})();