(function () {
	'use strict';

	angular.module('MainApp').controller('BlogController', BlogController);

	BlogController.inject = ['$scope', 'BlogService', '$location', '$rootScope'];
	function BlogController($scope, BlogService, $location, $rootScope) {
		var vm = this;
		vm.Blog = null;
		vm.comment = null;
		vm.Blogs = [];
		vm.comments = [];
		/*vm.getNewBlogs = getNewBlogs;*/
		vm.getApprovedBlogs = getApprovedBlogs;
		vm.getBlog = getBlog;
		vm.createBlog = createBlog;
		vm.updateBlog = updateBlog;
		vm.deleteBlog = deleteBlog;
		vm.submit = submit;
		vm.reset = reset;
		/*vm.edit = edit;*/
		vm.makeComment = makeComment;
		vm.getComments = getComments;
/*
		function getNewBlogs() {
			console.log('Inside BlogController::getNewBlogs()....');
			BlogService.getNewBlogs().then(function (data) {
				vm.Blogs = data;
			}, function (errorResponse) {
				console.error(errorResponse);
			});
		}
*/
		function getApprovedBlogs() {
			console.log('Inside BlogController::getApprovedBlogs()....');
			BlogService.getApprovedBlogs().then(function (data) {
				vm.Blogs = data;
			}, function (errorResponse) {
				console.error(errorResponse);
			});
		}

		function getBlog(id) {
			console.log('Inside BlogController::getBlog()....');
			BlogService.getBlogById(id).then(function (data) {
				console.log(data);
				vm.Blog = data;
				console.log('Getting Comments On Blog Id: ' + id);
				vm.getComments($rootScope.selectedBlog.blogId);
				$location.path('/blog-details');
			}, function (errorResponse) {
				console.error(errorResponse);
			});
		}

		function createBlog(Blog) {
			console.log('Inside BlogController::createBlog()....');
			BlogService.create(Blog).then(handleCreateSuccess,
				function (errorResponse) {
					console.error(errorResponse);
				});
		}

		function updateBlog(Blog) {
			console.log('Inside BlogController::updateBlog()....');
			BlogService.update(Blog).then(vm.getApprovedBlogs,
				function (errorResponse) {
					console.error(errorResponse);
				});
		}

		function deleteBlog(id) {
			console.log('Inside BlogController::deleteBlog()....');
			BlogService.remove(id).then(vm.getApprovedBlogs,
				function (errorResponse) {
					console.error(errorResponse);
				});
		}

		function makeComment(blog) {
			console.log('Inside BlogController::makeComment()....');
			console.log('Posting Comment' + vm.comment.comments);
			console.log('On Blog: -');
			console.log(blog);
			vm.comment.blog = blog;
			BlogService.makeComment(vm.comment).then(
				function (response) {
					alert('Your Comment Posted Successfully!');
					$location.path('/');
				},
				function (errResponse) {
					console.error('Error Posting Comment on the Blog');
				}
			);
		}

		function getComments(blogId) {
			console.log('Inside BlogController::getComments()....');
			BlogService.getComments(blogId).then(
				function (response) {
					console.log(response.data);
					vm.comments = response.data;
				},
				function (errResponse) {
					console.error('Error Getting Comments on Blog!');
				}
			);
		}

		function submit() {
			console.log('Creating New Blog');
			vm.Blog.user = $rootScope.loggedInUser;
			vm.createBlog(vm.Blog);
			vm.reset();
		}
/*
		function edit(id) {
			console.log('Inside BlogController::edit()....');
			for (var i = 0; i < vm.Blogs.length; i++) {
				if (vm.Blogs[i].blogId === id) {
					vm.Blog = angular.copy(vm.Blogs[i]);
					break;
				}
			}
		}
*/
		function reset() {
			console.log('Inside BlogController::reset()....');
			vm.Blog = {};
			$scope.blogForm.$setPristine();
		}

		// This method gets called when the controller gets initialized.
		activate();

		function activate() {
			// Get the list of all blogs.
			console.log('Inside BlogController::activate()....');
			vm.getApprovedBlogs();
		}

		function handleCreateSuccess() {
			console.log('Inside BlogController::handleCreateSuccess()....');
			vm.getApprovedBlogs();
			$location.path('/list-blogs');
		}
		
		$scope.checkTitle = function (data) {
            if (data === '')
                return 'Blog title cannot be empty';
        };

        $scope.checkContent = function (data) {
            if (data === '')
                return 'Content cannot be empty';
        }
	}
})();