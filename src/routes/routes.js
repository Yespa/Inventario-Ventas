const express = require("express");
const router = express.Router();

var ingreso = false;
var tabla_all_productos = [];
var factura = [];
var total = [{total_pagar: '0',}];
var valor_pagar=0;
var total_prod =0;
const mysqlConnection = require("../db");

/// RUTA PARA LA PAGINA DE ACCESO
router.get("/", (req, res) =>{
    res.sendFile("C:/Inventario-Ventas/src/public/login.html");
});

///RUTA PARA ACCEDER A LA PAGINA DE LOGIN
//Obtengo en un json los datos ingresados por el usuario en el html de login
router.post("/login",function(request,response) {
  //Almaceno el json
  let data = request.body;
  console.log(data);
  //inicializo el obj donde voy almacenar la info obtenido de DB
  var data_user = {};
  
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

/// RUTA DE LA PAGUNA PRINCIPAL - SE REDIRECCIONA DESPUES DE INGRESAR LAS CREDENCIALES EN EL LOGIN
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


/// RUTA PARA ACCEDER A LA PAGINA DEL INVENTARIO
router.get("/inventario",function(request,response) {
  if (ingreso) {
        console.log("Ingreso inventario exitoso");
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

/// RUTA PARA ACCEDER A LA PAGINA DE GASTOS
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

///// RUTA PARA ACCEDER A LA PAGINA DE LAS VENTAS
router.get("/ventas",function(request,response) {
  if (ingreso) {
        console.log("Ingreso Ventas exitoso");      
  
        response.render("ventas",{lista:tabla_all_productos,lis:factura,total:total});
        
  } else {
    response.send("No se ha autenticado");
  }
    
});


/// RUTA PARA AGREGAR UN NUEVO PRODUCTO A LA FACTURA
router.post("/addtocar_edit", function(request,response){

  let dataprod = request.body;
  factura.push(dataprod);
  console.log(factura);
  
  valor_pagar = 0;
  
  for(var i = 0; i < factura.length; i++){
    total_prod = 0;
    total_prod = (factura[i].precio_vent) * (factura[i].cant);
    valor_pagar = total_prod + valor_pagar;
        
    console.log("Pague", factura[i].precio_vent, factura[i].cant,total_prod,valor_pagar);
  }

  total = [{total_pagar: valor_pagar,}];
  console.log(total)
  response.send("Ok");
});

///RUTA PARA SELECCIONAR UN PRODUCTO DEL INVENTARIO Y EDITAR CANT Y CANTIDAR PARA POSTERIOMENTE AGG A LA FACTURA
router.post("/addtocar", function(request,response){

  let dataadd = request.body;

  mysqlConnection.query('SELECT * FROM inventario WHERE idinventario = ?', [dataadd.id], (err, producto_selec) => {
    
    response.send(producto_selec);
  });

});

///RUTA PARA ELIMINAR DESCARTAR UNA FACTURA COMPLETAMENTE - PAGINA VENTAS
router.get('/delete_factura', function(request,response){

  factura = [];
  valor_pagar = 0;
  total = [{total_pagar: '0',}];
  response.redirect('/ventas');

});

///RUTA PARA ELIMINAR UN ITEM DE LA FACTURA


///RUTA PARA EDITAR UN ITEM DE LA FACTURA


///RUTA PARA BUSCAR UN PRODUCTO EN EL INVENTARIO - PAGINA DE VENTAS
router.post("/search_inventory", function(request,response){
  
  const busqueda = request.body;
  console.log(busqueda.busqueda);
  mysqlConnection.query('SELECT * FROM inventario WHERE concat(id_prod,name_prod) LIKE "%'+ busqueda.busqueda +'%"', function(error, result) {
    console.log(result);
    response.render("ventas", {lista:result,lis:factura,total:total});
  });

});

///RUTA PARA AGREGAR UN NUEVO GASTO - PAGINA DE GASTOS
router.post("/add_gasto", function(request,response){
  //console.log(request.body);
  const data_newGastos = request.body;

  mysqlConnection.query('INSERT INTO gastos set ?', [data_newGastos], function(error, result, fields) {
    console.log(result);
    response.redirect("/gastos");
  });

});

///RUTA PARA AGREGAR UN NUEVO PRODUCTO AL INVENTARO - PAGINA DE INVENTARIO
router.post("/add_inventory", function(request,response){
  //console.log(request.body);
  const data_newInventario = request.body;

  mysqlConnection.query('INSERT INTO inventario set ?', [data_newInventario], function(error, result, fields) {
    console.log(result);
    response.redirect("/inventario");
  });

});

///RUTA PARA SELECCIONAR EL PRODUCTO A ACTUALIZAR - PAGINA DE INVENTARIO
router.get("/select_inventory/:idinventario", function(request,response){
  
  const { idinventario } = request.params;
  mysqlConnection.query('SELECT * FROM inventario WHERE idinventario = ?', [idinventario], (err, producto) => {
    response.render("select_inventario", {lista:producto[0]});

  });
});

///RUTA PARA SELECCIONAR EL GASTO A ACTUALIZAR - PAGINA DE GASTO
router.get("/select_gasto/:idgastos", function(request,response){
  
  const { idgastos } = request.params;
  mysqlConnection.query('SELECT * FROM gastos WHERE idgastos = ?', [idgastos], (err, gasto) => {
    response.render("select_gasto", {lista:gasto[0]});

  });
});

///RUTA PARA ACTUALIZAR UN PRODUCTO - PAGINA DE INVENTARIO
router.post("/update_inventory/:idinventario", function(request,response){
  
  const { idinventario } = request.params;
  const newProduct = request.body;

  mysqlConnection.query('UPDATE inventario set ? WHERE idinventario = ?', [newProduct, idinventario], (err, producto) => {
    response.redirect('/inventario');
  });
});

///RUTA PARA ACTUALIZAR UN GASTO - PAGINA DE GASTO
router.post("/update_gasto/:idgastos", function(request,response){
  
  const { idgastos } = request.params;
  const newGasto = request.body;

  mysqlConnection.query('UPDATE gastos set ? WHERE idgastos = ?', [newGasto, idgastos], (err, producto) => {
    response.redirect('/gastos');
  });
});

///RUTA PARA ELIMINAR UN PRODUCTO DEL INVENTARIO - PAGINA INVENTARIO
router.get("/delete_inventory/:idinventario", function(request,response){
  
  const { idinventario } = request.params;
  mysqlConnection.query('DELETE FROM inventario WHERE idinventario = ?', [idinventario], (err, rows) => {
   response.redirect('/inventario');
  });
});

///RUTA PARA ELIMINAR UN PRODUCTO DE LOS GASTOS - PAGINA GASTOS
router.get("/delete_gasto/:idgastos", function(request,response){
  
  const { idgastos } = request.params;
  mysqlConnection.query('DELETE FROM gastos WHERE idgastos = ?', [idgastos], (err, rows) => {
   response.redirect('/gastos');
  });
});




module.exports = router;