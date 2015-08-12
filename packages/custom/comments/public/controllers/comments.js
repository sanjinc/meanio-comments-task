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
  }
]);
