(function() {
	'use strict';

	angular.module('mainApp').controller('BlogController', BlogController);

	BlogController.inject = [ '$scope', 'BlogService', '$location',
			'$routeParams', '$rootScope' ];
	function BlogController($scope, BlogService, $location, $routeParams,
			$rootScope) {
		var vm = this;
		vm.Blog = null;
		vm.Blogs = [];
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
				vm.Blogs = data;
			}, function(errorResponse) {
				console.error(errorResponse);
			});
		}

		function getBlog(id) {
			BlogService.getBlogById(id).then(function(data) {
				//console.log('Data Received===> ' + data);
				vm.Blog = data;
				$location.path('/blog-details');
			}, function(errorResponse) {
				console.error(errorResponse);
			});
		}

		function createBlog(Blog) {
			BlogService.create(Blog).then(vm.getAllBlogs,
					function(errorResponse) {
						console.error(errorResponse);
					});
		}

		function updateBlog(Blog) {
			BlogService.update(Blog).then(vm.getAllBlogs,
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
			vm.Blog.user = $rootScope.loggedInUser;
			vm.createBlog(vm.Blog);
			vm.reset();
		}

		function edit(id) {
			for (var i = 0; i < vm.Blogs.length; i++) {
				if (vm.Blogs[i].blogId === id) {
					vm.Blog = angular.copy(vm.Blogs[i]);
					break;
				}
			}
		}

		function reset() {
			vm.Blog = {};
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