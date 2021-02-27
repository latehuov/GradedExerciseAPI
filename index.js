let port =process.env.PORT || 3000
const listingsComponent = require('./components/listings/listingsMain')
const usersComponent = require('./components/users/usersMain')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const express = require('express')



const app = express()
app.use(bodyParser.json())
app.use(cors())




app.get('/', function (req, res) {
  res.send('Hello World')
})


app.use('/listings', listingsComponent)
app.use('/users', usersComponent)


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404; // Set status code to 404
    next(err);  /* If you pass anything to the next() function (except the string 'route'),
                 Express regards the current request as being an error and will skip any
                 remaining non-error handling routing and middleware functions. */
});

app.listen(port, ()=> {console.log('listening on port ' + port)})