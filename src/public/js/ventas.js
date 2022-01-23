/// CARRITO COMPRAS //

var dataadd = {
    id: '0',
};

var dataprod = {
    nameprod: '0',
    cant: '0',
    precio_vent: '0',
};



function obtener(id){
    
    dataadd.id = id;
    //console.log("Envio",dataadd)

    $.post({
        url: "/addtocar",
        
        data: JSON.stringify(dataadd),
        contentType: "application/json",
        success: function(datosEntrada,status) {
        
            //console.log(datosEntrada);
            document.getElementById('nameproductmodal').placeholder = datosEntrada[0].name_prod;
            document.getElementById('cantproductmodal').placeholder = 0;
            document.getElementById('precioproductmodal').placeholder = datosEntrada[0].precio_venta;
                   
        }
    });

    $('#addproducmodal').modal('show');
    
}

document.getElementById('add_prod_venta').addEventListener('click', function() {
    
    dataprod.nameprod = document.getElementById('nameproductmodal').placeholder;
    dataprod.cant = document.getElementById('cantproductmodal').value;
    dataprod.precio_vent = document.getElementById('precioproductmodal').value;

    console.log(dataprod);

    $.post({
        url: "/addtocar_edit",
        
        data: JSON.stringify(dataprod),
        contentType: "application/json",
        success: function(datosEntrada,status) {
        
            window.location.replace("/ventas");
            
        }
    });
});