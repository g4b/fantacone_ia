var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collegeSchema = new Schema({
    name: String,
    website: String,
    location: String,
});

var college = mongoose.model('College', collegeSchema);
module.exports = {model: college, schema: collegeSchema};