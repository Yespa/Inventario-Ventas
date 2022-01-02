const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yeseju312',
  database: 'database_celuflash',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('DB conectada');
    }
  });
  
  module.exports = mysqlConnection;

