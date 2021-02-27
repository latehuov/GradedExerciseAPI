const express = require('express')
const router = express.Router()
const has = require('has-value')
var db = require('../db');


const Ajv = require('ajv').default
const listingsSchema = require('../schemas/listingsSchema.json');

router.post("/:id/:listingId", (req, res) =>{
    const ajv = new Ajv()
    const validate = ajv.compile(listingsSchema)
    const allHere = validate(req.body)

    if(!allHere) {
      res.status(400)
      console.log(res)
      res.send(validate.errors.map(err => err.message))
    }
    else{
      db.query("update users set id = $1, firstName = $2, lastName = $3, email =$4, dateOfBirth = $5, username=$6, password = $7, phoneNumber=$8 where idlisting = $9",
        [req.params.id, req.body.firstName, req.body.lastName, req.body.email, req.body.dateOfBirth, req.body.username, req.body.password, req.body.phoneNumber, req.params.listingId])
      .then(results => res.sendStatus(200))
    }
})

router.delete("/:id/:listingId", (req, res) =>{
    db.query("delete from listings where idlisting = $1", [req.params.listingId]).then(res.sendStatus(200))
})





module.exports = router