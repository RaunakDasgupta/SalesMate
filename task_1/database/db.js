const { createPool } = require('mysql2');
const db = createPool({
  host: 'interactly-mysqldb-1',
  port: '3306',
  user: 'root',
  password: '12345',
  database: 'Interactly',
  connectionLimit: 10,
});

module.exports = db;
