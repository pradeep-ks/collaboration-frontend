(function() {
	'use strict';

	angular.module('mainApp').controller('BlogController', BlogController);

	BlogController.inject = [ '$scope', 'BlogService', '$location',
			'$routeParams', '$rootScope' ];
	function BlogController($scope, BlogService, $location, $routeParams,
			$rootScope) {
		var vm = this;
		vm.blog = null;
		vm.blogs = [];
		vm.getAllBlogs = getAllBlogs;
		vm.getBlog = getBlog;
		vm.createBlog = createBlog;
		vm.updateBlog = updateBlog;
		vm.deleteBlog = deleteBlog;
		vm.submit = submit;
		vm.reset = reset;
		vm.edit = edit;

		function getAllBlogs() {
			BlogService.getAllBlogs().then(function(data) {
				vm.blogs = data;
			}, function(errorResponse) {
				console.error(errorResponse);
			});
		}

		function getBlog(id) {
			BlogService.getBlogById(id).then(function(data) {
				console.log('Data Received===> ' + data);
				vm.blog = data;
				vm.blog.user = data.user;
				$location.path('/blogDetails');
			}, function(errorResponse) {
				console.error(errorResponse);
			});
		}

		function createBlog(blog) {
			BlogService.create(blog).then(vm.getAllBlogs,
					function(errorResponse) {
						console.error(errorResponse);
					});
		}

		function updateBlog(blog) {
			BlogService.update(blog).then(vm.getAllBlogs,
					function(errorResponse) {
						console.error(errorResponse);
					});
		}

		function deleteBlog(id) {
			BlogService.remove(id).then(vm.getAllBlogs,
					function(errorResponse) {
						console.error(errorResponse);
					});
		}

		function submit() {
			console.log('Creating New Blog');
			vm.blog.user = $rootScope.loggedInUser;
			vm.createBlog(vm.blog);
			vm.reset();
		}

		function edit(id) {
			for (var i = 0; i < vm.blogs.length; i++) {
				if (vm.blogs[i].blogId === id) {
					vm.blog = angular.copy(vm.blogs[i]);
					break;
				}
			}
		}

		function reset() {
			vm.blog = {};
			$scope.blogForm.$setPristine();
		}

		// This method gets called when the controller gets initialized.
		activate();

		function activate() {
			// Get the list of all blogs.
			vm.getAllBlogs();
		}
	}
})();