const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cars = require('./cars');
const path = require('path');
const Car = require('../models/cars')

mongoose.connect('mongodb://localhost:27017/car-sale-web')
.then( () =>
{
    console.log('CONNECTION OPEN!');
})
.catch(err => {
    console.log('something went wrong with connection');
    console.log(err);
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () =>
{
    console.log("database is connected");
})

const seedDB = async () => {
    console.log('deleting old queries and inserting new');
    await Car.deleteMany({});
    for(let i = 0 ; i < cars.length; i++)
    {
        //console.log(`${cars[i].Model}`);
        const car = new Car({
            User: '6130f7fbd77e9f5b1b6caa63',
            Model: `${cars[i].Model}`,
            Manufacturer: `${cars[i].Manufacturer}`,
            Image: 'https://source.unsplash.com/collection/190727',
            YearManufactured: `${cars[i].YearManufactured}`,
            EngineVolume: `${cars[i].EngineVolume}`,
            TopSpeed: `${cars[i].TopSpeed}`,
            Price: `${cars[i].Price}`
        })
        await car.save();
    }
}

seedDB();