//////////// LOGIN ///////

var usuario = '0';
var password = '0';

var datau = {
    user: usuario,
    pass: password,
};

///////// CAMBIO DE CONTRASEÑA ////////
var usuario_cambio = '0';
var password_new = '1';
var confirm_password = '2';

var datac = {
    usernew: usuario_cambio,
    passnew: password_new,
    confirmpass: confirm_password
};

/////// VARIABLES DE TRABAJO ////////

let text ="Restablecer contraseña";
var bandera_ocultar = 0;


///////// BOTON DE LOGIN ////////

document.getElementById('login').addEventListener('click', function() {
    datau.user = document.getElementById("usuario").value;
    datau.pass = document.getElementById("contrasena").value;

    //Envio al server en un json los datos obtenidos del la pagina    
    $.post({
        url: "/login",
        
        data: JSON.stringify(datau),
        contentType: "application/json",
        success: function(datosEntrada,status) {
        if(datosEntrada === "Ok") {
                window.location.replace("/home");
        }else
        {
            alert('Nombre de usuario y/o contraseña incorrectos');
        }
                   
        }
    });
});

