const express = require('express')
const router = express.Router()
const has = require('has-value')
var db = require('../db');


router.get('/', (req, res) => {
    let startDate, endDate
    if(!req.query.startDate || typeof req.query.startDate !== 'string')
        res.sendStatus(400)
    startDate = req.query.startDate
    if (req.query.endDate && typeof req.query.endDate == 'string') {
        endDate = req.query.endDate
        db.query("select idListing, title, category, city, imgSRC, price, dateOrigin, acquire, description, firstName, lastName, email, phoneNumber from listings join users on idUser = id where dateOrigin between '$1' and '$2' group by idListing, firstName, lastName, email, phonenumber", [startDate, endDate]).then(results => {
            if(results.length < 1)
                res.sendStatus(404)
            else
                res.json(results.rows)
        })
    }
    else {
        db.query("select idListing, title, category, city, imgSRC, price, dateOrigin, acquire, description, firstName, lastName, email, phoneNumber from listings join users on idUser = id where dateOrigin >= $1 group by idListing, firstName, lastName, email, phonenumber", [startDate]).then(results => 
            {
                if(results.length < 1)
                    res.sendStatus(404)
                else
                    res.json(results.rows)
            }
        )
    }
})

module.exports = router