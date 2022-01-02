const express = require("express");
const router = express.Router();

const mysqlConnection = require("../db");


router.get("/", (req, res) =>{
    res.sendFile("C:/Inventario-Ventas/src/public/login.html");
});

// GET all Employees
router.get('/info', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

module.exports = router;