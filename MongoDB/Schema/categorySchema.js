var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catagorySchema = new Schema({
    value: String,
});

var category = mongoose.model("category", catagorySchema);

module.exports = category;