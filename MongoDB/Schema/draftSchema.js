var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var draftSchema = new Schema({
    blogId: String,
    title: String, 
    author: String,
    description: String,
    contentHTML: String,
    contentText: String,
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

var Draft = mongoose.model("Draft", draftSchema);
module.exports = Draft;