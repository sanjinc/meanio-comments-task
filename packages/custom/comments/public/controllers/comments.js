'use strict';

/* jshint -W098 */
angular.module('mean.comments').controller('CommentsController', ['$scope', 'Global', 'Comments', 'MeanUser', '$stateParams',
  function($scope, Global, Comments, MeanUser, $stateParams) {
    $scope.global = Global;
    $scope.package = {
      name: 'comments'
    };
    $scope.user = MeanUser.user;
    $scope.isAdmin = MeanUser.isAdmin;
    $scope.create = function(isValid) {
      if (isValid) {
        var comment = new Comments({
          user: $scope.user.name,
          parent: $stateParams.articleId,
          body: $scope.comment.body
        });
        comment.$save({
          articleId: $stateParams.articleId
        }, function(response) {
          if($scope.isAdmin) {
            $scope.comments.unshift(response);
          }
        });
        $scope.comment.body = "";
      } else {
        $scope.submitted = true;
      }
    };
    $scope.findComments = function(article) {
      $scope.comments = [];
      Comments.query({
        articleId: article._id
      }).$promise.then(function(response) {
        response.forEach(function(comment) {
          if(!$scope.isAdmin && !comment.pending) {
            $scope.comments.push(comment);
          }
          if($scope.isAdmin) {
            $scope.comments.push(comment);
          }
        });
      });
    };
  }
]);
