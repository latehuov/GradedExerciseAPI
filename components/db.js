const Pool = require('pg').Pool

const connection = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432,
  ssl : {rejectUnauthorized : false}
})
module.exports = connection;
