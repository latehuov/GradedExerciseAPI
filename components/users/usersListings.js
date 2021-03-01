const express = require('express')
const router = express.Router()
const has = require('has-value')
var cloudinary = require('cloudinary').v2;
var {CloudinaryStorage} = require('multer-storage-cloudinary');
var multer = require('multer');
var db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.get('/:id', (req, res) =>{
    console.log(req.params.id +  " requesting own listings")
    db.query("select * from listings where idUser = $1", [req.params.id])
    .then(results => {
        if(results.rows.length < 1)
        {
            res.sendStatus(404)
        }
        else
        res.json(results.rows)})
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "herokushit",
    allowedFormats: ["jpg", "png"]
  });
  var parser = multer({ storage: storage });
  
const Ajv = require('ajv').default
const listingsSchema = require('../schemas/listingsSchema.json');

router.post("/:id", (req, res) =>{
    console.log(req.file)
    const ajv = new Ajv()
    const validate = ajv.compile(listingsSchema)
    const allFieldsValid = validate(req.body)

    if(!allFieldsValid)
    {
        res.status(400)
        res.send(validate.errors.map(err =>err.message))
    }
    else
    {
        console.log(req.body)
        db.query("insert into listings (idUser, idListing, title, category, city, imgSRC, price, dateOrigin, acquire, description) values ($1, $2, $3, $4, $5, '{"+req.body.imgSRC.map(src =>src) +"}',$6,$7,$8,$9)", 
        [req.params.id, uuidv4(), req.body.title, req.body.category, req.body.city, req.body.price, req.body.dateOrigin, req.body.acquire, req.body.description])
        .then(results => res.sendStatus(200))
    }

})







module.exports = router