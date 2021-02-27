const Pool = require('pg').Pool

const connection = new Pool({
  user: 'tgahvaimimcnuy',
  host: 'ec2-54-87-34-201.compute-1.amazonaws.com',
  database: 'd8eem8koof13qk',
  password: '560d7243836e161b66bf1575dd286b0385f5ba7eaa81b0f77b50ee758b27a080',
  port: 5432,
  ssl: true
})
module.exports = connection;