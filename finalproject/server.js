var express = require("express");
var app = express()
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions


app.get('/', function(req, res){
    res.send('Welcome to your future');
});

app.listen(5000, function(err){
    if (!err)
        console.log("site is live");
    else console.log(err);

});

//Models
var models = require("./app/models");

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Database confirmation');

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database");

});


//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

// passport strats
require('./app/config/passport/passport.js')(passport, models.user);


//ForHandlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
