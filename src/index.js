
//Importo frameworks y modulos
const express = require("express");
const morgan = require("morgan");


//Inicializo express
const app = express();

//Configuracion del server
app.set("port", 3010);


//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Variables globales


//Public

//Rutas

app.use(require("./routes/routes"));


//Inicializacion del server

app.listen(app.get("port"), () =>{
    console.log('Servidor de Celuflash en el puerto', app.get("port"));

});





