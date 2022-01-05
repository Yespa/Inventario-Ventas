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

router.get("/inventario",function(request,response) {
  if (ingreso) {
        console.log("Ingreso inventario exitoso");
        response.sendFile("C:/Inventario-Ventas/src/public/inventario.html");
        mysqlConnection.query('SELECT * FROM inventario', (err, rows) => {
          
          if (err){
            response.json(err);
          }
          console.log(rows)
          //response.render("C:/Inventario-Ventas/src/public/inventario.html");

        });
  } else {
    response.send("No se ha autenticado");
  }
    
  });

//GET all Employees
// router.get('/info', (req, res) => {

//   var name = 'hello';
    
//   res.render("login", {name:name});

//   });


//Obtengo en un json los datos ingresados por el usuario en el html de login
router.post("/login",function(request,response) {
    //Almaceno el json
    let data = request.body;
    console.log(data)
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



router.post("/add_inventory", function(request,response){
  console.log(request.body);
  const data_newInventario = request.body;

  mysqlConnection.query('INSERT INTO inventario set ?', [data_newInventario], function(error, result, fields) {
    console.log(result);
    response.send("Melo")
  });

});



module.exports = router;