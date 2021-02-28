//all of the routes used in users
const usersListings = require('./usersListings')
const usersEdit = require('./usersEdit')
const userSchema = require('../schemas/userSchema.json')
const Ajv = require('ajv').default
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const router = express.Router()
const has = require('has-value')
var db = require('../db');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  function(username, password, done) {
    console.log(username, password)
    db.query("select id, username, password from users where username = $1" , [username]).then(results =>{
    console.log(results.rows[0].password)
    let user = results.rows
    if(results.rows == undefined) {
      // Username not found
      console.log("HTTP Basic username not found");
      return done(null, false, { message: "HTTP Basic username not found" });
    }

    /* Verify password match */
    if(password != results.rows[0].password) {
      // Password does not match
      console.log("HTTP Basic password not matching username");
      return done(null, false, { message: "HTTP Basic password not found" });
    }
    return done(null, user)
  })
  }
));

  router.post('/login', passport.authenticate("basic", {session:false}), (req, res) => {
    const body = {
      id: req.user[0].id,
      username: req.user[0].username
    };
    console.log(req.user[0].id)
    let idUser = req.user[0].id
    const payload = {user:body}
    const token = jwt.sign(payload, process.env.supersecret)
    res.status(200)
    res.json({idUser, token})
  })






const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;


  let options = {}

  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.supersecret;
  
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    console.log("Processing JWT payload for token content:");
    console.log(jwt_payload);
  done(null, jwt_payload.user);
  }));


  router.post("/", (req, res) => { //create new user
    const ajv = new Ajv()
    const validate = ajv.compile(userSchema)
    const allHere = validate(req.body)

    if(!allHere) {
      res.status(400)
      console.log(res)
      res.send(validate.errors.map(err => err.message))
    }
    else{
      let userId = uuidv4()
      db.query("insert into users (id, firstName, lastName, email, dateOfBirth, username, password, phoneNumber) values ($1,$2,$3,$4,$5,$6,$7, $8)",[userId, req.body.firstName, req.body.lastName, req.body.email, req.body.dateOfBirth, req.body.username, req.body.password, req.body.phoneNumber])
      .then(results => res.json(userId))
    }
  })

  router.use('/userpage/browse' , passport.authenticate("jwt", {session:false}), usersListings)
  router.use('/userpage/edit', passport.authenticate("jwt", {session:false}),usersEdit)


module.exports = router