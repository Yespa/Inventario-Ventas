const express = require("express");
const router = express.Router();

var ingreso = false;

const mysqlConnection = require("../db");


router.get("/", (req, res) =>{
    res.sendFile("C:/Inventario-Ventas/src/public/login.html");
});


router.get("/home",function(request,response) {
  if (ingreso) {
        console.log("Ingreso home exitoso");
        response.sendFile("C:/Inventario-Ventas/src/public/home.html");
  } else {
    response.send("No se ha autenticado");
  }
    
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


//Obtengo en un json los datos ingresados por el usuario en el html de login
router.post("/login",function(request,response) {
    //Almaceno el json
    let data = request.body;

    //inicializo el obj donde voy almacenar la info obtenido de DB
    var data_user = {};
    //console.log(data,"first");
    
    if (data.user && data.pass) {
      //Realizo la consulta  
      mysqlConnection.query('SELECT * FROM user WHERE username = ? AND password = ?', [data.user, data.pass], function(error, result, fields) {
      var data_user =result;
      console.log(data_user);
      user_memory = data.user;
      if (data_user.length > 0) {
          
        ingreso = true;
        response.send("Ok");        
        
      } else {
        
        response.send('Usuario y/o contraseña incorrectos!');
        ingreso = false;
      }           
    });
  } else {
    response.send('Ingrese usuario y contraseña!');
  }



    
});



module.exports = router;