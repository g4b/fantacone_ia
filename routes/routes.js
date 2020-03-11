var currentCounselor;
var currentStudent;
var Counselor = require('../models/counselor.js').model;
var Student = require('../models/student.js').model;
var csvjson = require('../csvjson.js');
// var College = require('../models/college.js').model;

module.exports = function(app) {
    app.get('/', function(req, res){
        var COUNSELORSKELETON = new Counselor({
            name: 'Jane Doe',
            email: 'janedoe@berkeley.net',
            username: 'janedoe',
            password: '654321',
            students: [STUDENTSKELETON]
        });

        var STUDENTSKELETON = new Student({
            name: 'John Doe',
            email: 'johndoe@students.berkeley.net',
            username: 'johndoe',
            password: '123456',
            smallschool: 'BIHS',
            colleges: [],
            appProgress: 'Not Started',
            counselor: COUNSELORSKELETON,
            otherInfo: 'N/A'
        });
        
        STUDENTSKELETON.save(function(err, student) {
           console.log(student); 
        });
        COUNSELORSKELETON.save(function(err, counselor) {
            console.log(counselor);
        });

        res.render('welcome.ejs', {error: ""});
    });
    app.get('/cLogin', function(req, res){
        res.render('counselorLogin.ejs', {error: ''});
    });
    app.get('/sLogin', function(req, res){
        res.render('studentLogin.ejs', {error: ''});
    });
    app.post('/counselorLogin', function(req, res) {
        Counselor.findOne({username: req.body.username, password: req.body.password}, function(err, counselor){
            if (counselor){
                currentCounselor = counselor;
                res.render('counselorHome.ejs', {counselor: currentCounselor, error:''});
            } else {
                res.render('counselorLogin.ejs', {error: 'Unsupported login. Please try again.'});
            }
        });
    });
    app.post('/studentLogin', function(req, res) {
        Student.findOne({username: req.body.username, password: req.body.password}, function(err, student){
            if (student){
                currentStudent = student;
                res.render('studentHome.ejs', {student: currentStudent, error: ''});
            } else {
                res.render('studentLogin.ejs', {error: 'Unsupported login. Please try again.'});
            }
        });
    });
    app.post('/addCounselor', function(req, res){
        var newCounselor = new Counselor({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        newCounselor.save(function(err, newCounselor){
            currentStudent.counselor = newCounselor;
            res.render('studentHome.ejs', {counselor: newCounselor});
        });
    });
    app.post('/addStudent', function(req, res){
        var newStudent = new Student({
            name: req.body.name,
            email: req.body.email,
            smallschool: req.body.smallschool,
            counselor: currentCounselor,
            otherInfo: ''
        });
        newStudent.save(function(err, newStudent){
            currentCounselor.students.push(newStudent);
            res.render('counselorHome.ejs', {student: newStudent});
        });
    });
    // make dropdown list of students?
    app.post('/searchStudents', function(req, res){
        Student.findOne({name: req.body.searchName}, function(err, student){
            // change later
            if (student){
                alert('Found Student ' + student.name);
                currentCounselor.students.append(student);
            } else {
                res.render('counselorHome.ejs', {error: "Could not find student"});
            }
        });
    });
    app.post('/searchCounselors', function(req, res){
        Counselor.findOne({name: req.body.searchName}, function(err, counselor){
            if (counselor){
                currentStudent.counselor = counselor;
                res.render('studentHome.ejs', {error: 'Counselor ' + counselor.name + ' has been located and added to your profile.'});
            } else {
                res.render('studentHome.ejs', {error: 'Could not find counselor. Please try again or enter their information manually.'});
            }
        });
    });
    /*app.post('/addCollege', function(req, res){
        var newCollege = new College({
            name: req.body.name,
            website: req.body.website,
            location: req.body.location
        });
        newCollege.save(function(err, newCollege){
            if(req.body.addToProfile.checked){
                currentStudent.colleges.append(newCollege);
                res.render('studentHome.ejs', {msg: "Added " + req.body.name + " to your colleges."});
            } else {
                res.render('studentHome.ejs', {msg: "Added " + req.body.name + " to the master list of colleges."});
            }
        });
    });*/
    app.post('/logProgress', function(req, res){
        currentStudent.appProgess = req.body.progress;
        res.render('counselorHome.ejs', {progress: req.body.progress});
    });
    app.post('/searchColleges', function(req, res){
        var first = 0;
        var last = csvjson.length - 1;
        while (first <= last){
            var middle = Math.floor((first + last) / 2);
            if (csvjson[middle].INSTNM < req.body.name) {
                first = middle + 1;
            } else if (csvjson[middle].INSTNM > req.body.name){
                last = middle - 1;
            } else {
                console.log(csvjson[middle].INSTNM);
                currentStudent.colleges.push(csvjson[middle]);
                res.render('studentHome.ejs', {error: "Added " + csvjson[middle].INSTNM + " to your list of colleges.", student: currentStudent});
                return 1;
            }
        }
        res.render('studentHome.ejs', {error: "Unable to locate college. Please try again.", student: currentStudent});
        return 0;
    })
}