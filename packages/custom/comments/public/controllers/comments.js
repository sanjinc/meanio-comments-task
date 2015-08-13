'use strict';

/* jshint -W098 */
angular.module('mean.comments').controller('CommentsController', ['$scope', 'Global', 'Comments', 'MeanUser',
  function($scope, Global, Comments, MeanUser) {
    $scope.global = Global;
    $scope.package = {
      name: 'comments'
    };
    $scope.user = MeanUser.user;
    $scope.isAdmin = MeanUser.isAdmin;
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
