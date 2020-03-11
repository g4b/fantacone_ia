var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    smallschool: String,
    colleges: Array,
    appProgress: String,
    counselor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "counselor",
        required: true
    },
    otherInfo: String
});

var student = mongoose.model('Student', studentSchema);
module.exports = {model: student, schema: studentSchema};