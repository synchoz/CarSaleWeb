const express = require('express');
const router = express.Router();
const Car = require('../models/cars');
const {isLoggedIn} = require('../middleware');
const multer = require('multer');
const {storage, cloudinary} = require('../cloudinary/index');
require('dotenv').config();
const upload = multer({ storage });


router.get('/', async (req,res) =>
{
    const cars = await Car.find({});
    res.render('cars/index',{cars});
})

router.get('/new', isLoggedIn, (req,res) =>
{

    res.render('cars/new');
})

router.get('/:id', async (req,res) =>
{
    
    const carDetails = await Car.findById(req.params.id).populate('User');
    //console.log(carDetails);
    res.render('cars/show',{carDetails});
})

router.get('/:id/edit', isLoggedIn ,async (req,res) =>
{
    const carToEdit = await Car.findById(req.params.id);
    res.render('cars/edit', {carToEdit});
})

router.put('/:id' ,upload.single('Image'), isLoggedIn, async (req,res,next) =>
{
     const carToEdit = await Car.findByIdAndUpdate(req.params.id,{...req.body.car});
     carToEdit.Image = req.file.path;
     await carToEdit.save();
     upload.single('Image');
     console.log('file information:--->');
     console.log(req.file.path);
     res.redirect(`/cars/${carToEdit._id}`); 
})

router.post('/',upload.single('Image'), isLoggedIn, async (req,res) =>
{
    const newCar = new Car(req.body.car);
    newCar.Image = req.file.path;
    newCar.User = req.user._id;
    console.log(req.body.car);
    await newCar.save();
    res.redirect(`/cars/${newCar._id}`);
})

router.delete('/:id', isLoggedIn, async (req,res) =>
{
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/cars')
})

module.exports = router;