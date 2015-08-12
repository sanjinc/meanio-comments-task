'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    _ = require('lodash');

module.exports = function(Comments) {

    return {
        /**
         * Find comment by id
         */
        comment: function(req, res, next) {
            var id = req.params.commentId;
            Comment.findOne({_id:id}, function(err, comment) {
                if (err) return next(err);
                if (!comment) return next(new Error('Failed to load comment ' + id));
                req.comment = comment;
                next();
            });
        },
        /**
         * Show a comment
         */
        show: function(req, res) {
            res.json(req.comment);
        },
        /**
         * Find comments by article id
         */
        comments: function(req, res) {
            var params = {
                parent: req.params.articleId
            };
            Comment.find(params).sort('-created').exec(function(err, comments) {
                if (err) {
                    res.status(500).json({
                        error: 'Cannot list the comment'
                    });
                }
                res.json(comments);
            });
        }
    };
}
