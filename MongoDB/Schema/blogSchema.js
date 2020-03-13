var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String, 
    author: String,
    description: String,
    contentHTML: String,
    contentText: String,
    category: [{value: String}],
    comments: [{ username: String, content: String, date: Date }],
    createdTime: Date,
    lastEditedTime: Date,
    coverPicPath: String,
    tags: [{ value: String, color: String}],
    meta: {
        votes: Number,
        favs: Number
    },
    isPublish: Boolean,
    isDraft: Boolean,
});

var Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
