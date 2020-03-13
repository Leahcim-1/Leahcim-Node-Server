var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean,
    email: String,
    birthDate: Date,
})

var User = mongoose.model("User", userSchema);
module.exports = User;