const express = require('express');
const { model } = require('mongoose');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const router = express.Router();
const User = require('../models/user');

//const catchAsync = require('../utils/catchAsync'); later when i have done with validation vids <---


router.get('/register', (req,res) =>{
    res.render('users/register');
})


router.post('/register', async (req,res, next) =>
{
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user,password);
    req.login(registeredUser, err =>
        {
            if(err)
            {
                return next(err);
            }
            else
            {
                console.log(registeredUser);
                res.redirect('/cars');
            }
        })

})

router.get('/login',(req,res) =>
{
    res.render('users/login');
})

router.post('/login',passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}),  (req,res) =>
{
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/cars';
    res.redirect(redirectUrl);
})

router.get('/logout', isLoggedIn, (req, res) =>
{
    req.logOut();
    req.flash('success', 'logged out successfully!');
    res.redirect('/cars')
})

module.exports = router;