//=======================
//REQUIRE AND SET MODULES
//=======================
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('express-method-override');
const Campground = require('./models/campground.js');
const Comment = require('./models/comment.js');
const User = require('./models/user.js');
const seedsDb = require('./seeds');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const campgroundRoutes = require('./routes/campground');
const commentRoutes = require('./routes/comment');
const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname +"/public"));
app.use(methodOverride('_method'));
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(session({
    secret:"I am the best",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//=======================
//DATA BASE CONFIGURATION
//=======================
mongoose.connect('mongodb://localhost/yelp-camp-2');
//seedsDb();


//Routes
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp Camp server started');
});