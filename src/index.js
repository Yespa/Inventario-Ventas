
//Importo frameworks y modulos
const express = require("express");
const morgan = require("morgan");
const path = require("path");


//Inicializo express
const app = express();

//Configuracion del server
app.set("port", 3010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middleware
app.use(morgan("dev"));
app.use(express.json());
//app.use(express.static("src"));
app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));


//Rutas

app.use(require("./routes/routes"));


//Inicializacion del server

app.listen(app.get("port"), () =>{
    console.log('Servidor de Celuflash en el puerto', app.get("port"));

});





