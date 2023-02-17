const Pool = require('pg').Pool
 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'margodatabase',
    password: 'sasuke',
    port: 5432,
});

module.exports = pool;
