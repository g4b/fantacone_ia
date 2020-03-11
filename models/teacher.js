var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    name: String,
    email: String,
    subject: String,
    students: Array
});

var teacher = mongoose.model('Teacher', teacherSchema);
module.exports = {model: teacher, schema: teacherSchema};