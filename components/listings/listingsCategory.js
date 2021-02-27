const express = require('express')
const router = express.Router()
const has = require('has-value')
var db = require('../db');

router.get("/:category", (req, res) => {
    if(!req.params.category || typeof req.params.category !== "string")
        res.sendStatus(400)
        db.query("select idListing, title, category, city, imgSRC, price, dateOrigin, acquire, description, firstName, lastName, email, phoneNumber from listings join users on idUser = id where category like '%$1%' group by idListing, firstName, lastName, email, phonenumber", [req.params.category]).then(results => 
            {
                if(results.length < 1)
                    res.sendStatus(404)
                else
                    res.json(results)
            }
        )  
})



module.exports = router