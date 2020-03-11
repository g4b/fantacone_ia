var mongoose = require('mongoose');
var express = require('express');

var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
require('./routes/routes.js')(app);

app.listen(3000);
console.log('Listening at localhost:3000');

mongoose.connect('mongodb+srv://ggfantacone:himralbinson@cluster0-vh0ja.mongodb.net/test?retryWrites=true&w=majority');