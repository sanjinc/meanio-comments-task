'use strict';

angular.module('mean.comments').factory('Comments', [
  function($resource) {
    return $resource('api/comments/article/:articleId', {
      articleId: '@articleId'
    });
  }
]);
