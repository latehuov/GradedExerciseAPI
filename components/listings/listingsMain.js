//all routes used in listings
const categories = require('./listingsCategory')
const cities = require('./listingsCity')
const dates = require('./listingsDate')
var db = require('../db');
const express = require('express')
const router = express.Router()
const has = require('has-value')
var listingsData = require("../listingsData")

router.get('/', (req, res) =>{
    db.query("select idListing, title, category, city, imgSRC, price, dateOrigin, acquire, description, firstName, lastName, email, phoneNumber from listings join users on idUser = id group by idListing, firstName, lastName, email, phonenumber")
    .then(results => {
        console.log("selected all")
        res.json(results.rows)})
})


router.use('/city' , cities)
router.use('/category', categories)
router.use('/date', dates)



module.exports = router