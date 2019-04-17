// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');//a way to interact with mongodb
var passport = require('passport');//help us create users
var flash    = require('connect-flash');// how we will get error messages when login is wrong

var morgan       = require('morgan');//package that enables us to debug and give play by play of request in terminal
var cookieParser = require('cookie-parser');//enables us to work with cookies and helps us with log in users portion
var bodyParser   = require('body-parser');
var session      = require('express-session');// helps manage login users section
var multer = require('multer');
var ObjectId = require('mongodb').ObjectID
var configDB = require('./config/database.js');//exports and object

var db// global variable

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db,  multer, ObjectId);
}); // connect to our database

//app.listen(port, () => {
    // MongoClient.connect(configDB.url, { useNewUrlParser: true }, (error, client) => {
    //     if(error) {
    //         throw error;
    //     }
    //     db = client.db(configDB.dbName);
    //     console.log("Connected to `" + configDB.dbName + "`!");
    //     require('./app/routes.js')(app, passport, db);
    // });
//});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'artIsLife', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
//require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Art is life ' + port);
