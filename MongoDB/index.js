var User = require('./Schema/usersSchema');
var Blog = require('./Schema/blogSchema');
var Draft= require('./Schema/draftSchema');
var Category = require('./Schema/categorySchema')

var url = `mongodb+srv://leahcim:a578287412@leahcimblogcluster-f1npf.mongodb.net/LeahcimBlog?retryWrites=true&w=majority`;

function connectDB (mongoose) {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false});
    var db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open',  ( ) => {
        console.log('Connected to database');
    });
    return {
        Blog,
        User,
        Draft,
        Category,
    }
}


module.exports = connectDB;