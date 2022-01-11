const express = require("express");
const router = express.Router();

var ingreso = false;
var tabla_all_productos = [];
var factura = [];
const mysqlConnection = require("../db");


router.get("/", (req, res) =>{
    res.sendFile("C:/Inventario-Ventas/src/public/login.html");
});


router.get("/home",function(request,response) {
  if (ingreso) {
        console.log("Ingreso home exitoso");
        mysqlConnection.query('SELECT * FROM inventario', (err, rows) => {
          
          if (err){
            response.json(err);
          }
          tabla_all_productos = rows;

        });
        response.sendFile("C:/Inventario-Ventas/src/public/home.html");
  } else {
    response.send("No se ha autenticado");
  }
    
  });

router.get("/inventario",function(request,response) {
  if (ingreso) {
        console.log("Ingreso inventario exitoso");
        //response.sendFile("C:/Inventario-Ventas/src/public/inventario.html");
        mysqlConnection.query('SELECT * FROM inventario', (err, rows) => {
          
          if (err){
            response.json(err);
          }
          console.log(rows);
          tabla_all_productos = rows;
    
          response.render("inventario", {lista:tabla_all_productos});

        });
  } else {
    response.send("No se ha autenticado");
  }
    
  });

router.get("/gastos",function(request,response) {
  if (ingreso) {
        console.log("Ingreso Gastos exitoso");
        //response.sendFile("C:/Inventario-Ventas/src/public/inventario.html");
        mysqlConnection.query('SELECT * FROM gastos', (err, rows) => {
          
          if (err){
            response.json(err);
          }
          console.log(rows);
    
          response.render("gastos", {lista:rows});

        });
  } else {
    response.send("No se ha autenticado");
  }
    
  });

router.get("/ventas",function(request,response) {
  if (ingreso) {
        console.log("Ingreso Ventas exitoso");      
  
        response.render("ventas",{lista:tabla_all_productos,lis:factura});
        
  } else {
    response.send("No se ha autenticado");
  }
    
  });

  router.get("/add/:idinventario", function(request,response){
  
    const { idinventario } = request.params;
    mysqlConnection.query('SELECT * FROM inventario WHERE idinventario = ?', [idinventario], (err, producto_selec) => {
      console.log(factura);
      factura.push(producto_selec[0]);
      console.log(factura);
      response.redirect("/ventas");
    });

  });


//Obtengo en un json los datos ingresados por el usuario en el html de login
router.post("/login",function(request,response) {
    //Almaceno el json
    let data = request.body;
    console.log(data);
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

router.post("/search_inventory", function(request,response){
  
  const busqueda = request.body;
  console.log(busqueda.busqueda);
  mysqlConnection.query('SELECT * FROM inventario WHERE concat(id_prod,name_prod) LIKE "%'+ busqueda.busqueda +'%"', function(error, result) {
    console.log(result);
    response.render("ventas", {lista:result,lis:factura});
  });

});

router.post("/add_gasto", function(request,response){
  //console.log(request.body);
  const data_newGastos = request.body;

  mysqlConnection.query('INSERT INTO gastos set ?', [data_newGastos], function(error, result, fields) {
    console.log(result);
    response.redirect("/gastos");
  });

});

router.post("/add_inventory", function(request,response){
  //console.log(request.body);
  const data_newInventario = request.body;

  mysqlConnection.query('INSERT INTO inventario set ?', [data_newInventario], function(error, result, fields) {
    console.log(result);
    response.redirect("/inventario");
  });

});

router.post("/update_inventory/:idinventario", function(request,response){
  
  const { idinventario } = request.params;
  const newProduct = request.body;

  mysqlConnection.query('UPDATE inventario set ? WHERE idinventario = ?', [newProduct, idinventario], (err, producto) => {
    response.redirect('/inventario');
  });
});

router.post("/update_gasto/:idgastos", function(request,response){
  
  const { idgastos } = request.params;
  const newGasto = request.body;

  mysqlConnection.query('UPDATE gastos set ? WHERE idgastos = ?', [newGasto, idgastos], (err, producto) => {
    response.redirect('/gastos');
  });
});

router.get("/select_inventory/:idinventario", function(request,response){
  
  const { idinventario } = request.params;
  mysqlConnection.query('SELECT * FROM inventario WHERE idinventario = ?', [idinventario], (err, producto) => {
    response.render("select_inventario", {lista:producto[0]});

  });
});

router.get("/select_gasto/:idgastos", function(request,response){
  
  const { idgastos } = request.params;
  mysqlConnection.query('SELECT * FROM gastos WHERE idgastos = ?', [idgastos], (err, gasto) => {
    response.render("select_gasto", {lista:gasto[0]});

  });
});


router.get("/delete_inventory/:idinventario", function(request,response){
  
  const { idinventario } = request.params;
  mysqlConnection.query('DELETE FROM inventario WHERE idinventario = ?', [idinventario], (err, rows) => {
   response.redirect('/inventario');
  });
});

router.get("/delete_gasto/:idgastos", function(request,response){
  
  const { idgastos } = request.params;
  mysqlConnection.query('DELETE FROM gastos WHERE idgastos = ?', [idgastos], (err, rows) => {
   response.redirect('/gastos');
  });
});




module.exports = router;