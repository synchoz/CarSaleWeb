
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const Car = require('./models/cars')
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const userRoutes = require('./routes/users')
const carsRoutes = require('./routes/cars');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const flash = require('connect-flash');
const multer = require('multer');
const upload = multer();
require('dotenv').config();

//mongoose.connect('mongodb://localhost:27017/car-sale-web')
mongoose.connect(process.env.MONGODB_URI)
.then( () =>
{
    console.log('CONNECTION OPEN!');
})
.catch(err => {
    console.log('something went wrong with connection');
    console.log(err);
})

const sessionConfig = {
    secret:'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+ 1000*60*60*24 *7,
        maxAge: 1000*60*60*24 *7
    }
};

app.use(flash());
app.use(express.urlencoded({extended:true}));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static('views/cars'));

app.use((req,res, next) =>
{
    console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
app.use(methodOverride('_method'));
app.use('/cars', carsRoutes);
app.use('/',userRoutes);









const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () =>
{
    console.log("database is connected");
})

app.set('view engine','ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));//views is the directory 

app.get('/',(req,res) =>
{
    res.render('home');
})
const port = process.env.PORT || 3000;
app.listen(port, () =>
{
    console.log('app is running');
})