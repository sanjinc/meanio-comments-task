'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        trim: true
    },
    user: {
        type: String,
        ref: 'User'
    },
    parent: {
        type: Schema.ObjectId,
        ref: 'Article'
    },
    pending: {
        type: Boolean,
        default: true
    }
});

mongoose.model('Comment', CommentSchema);
