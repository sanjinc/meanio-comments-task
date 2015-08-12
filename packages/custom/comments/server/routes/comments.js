'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Comments, app, auth, database) {

  var comments = require('../controllers/comments')(Comments);

  app.route('/api/comments')
      .get(comments.all);
  app.route('/api/comments/:commentId')
      .get(comments.show)
      .put(comments.update);
  app.route('/api/comments/article/:articleId')
      .get(comments.comments)
      .post(comments.create);

  app.param('commentId', comments.comment);

};
