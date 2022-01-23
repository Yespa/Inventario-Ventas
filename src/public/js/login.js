//////////// LOGIN ///////

var usuario = '0';
var password = '0';

var datau = {
    user: usuario,
    pass: password,
};


///////// BOTON DE LOGIN ////////

document.getElementById('login').addEventListener('click', function() {
    datau.user = document.getElementById("usuario").value;
    datau.pass = document.getElementById("contrasena").value;

    //Envio al server en un json los datos obtenidos de la pagina    
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

