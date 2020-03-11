var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counselorSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    students: Array
});

var counselor = mongoose.model('Counselor', counselorSchema);
module.exports = {model: counselor, schema: counselorSchema};