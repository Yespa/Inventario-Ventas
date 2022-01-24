/// CARRITO COMPRAS //

var dataadd = {
    id: '0',
};

var dataedit = {
    id: '0',
};

var dataprod = {
    idinventario: '0',
    idprod: '0',
    nameprod: '0',
    cant: '0',
    precio_compra: '0',
    precio_vent: '0',
};

/// Datos de la base de datos



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
            dataprod.idinventario = datosEntrada[0].idinventario;
            dataprod.idprod = datosEntrada[0].id_prod;
            dataprod.precio_compra = datosEntrada[0].precio_compra;
            dataprod.nameprod = datosEntrada[0].name_prod;
            console.log(dataprod);       
        }
    });

    $('#addproducmodal').modal('show');
    
}


function obtener_edit_factura(id){
    
    dataedit.id = id;
    console.log("Envio",dataedit.id);

    // $.get({
    //     url: "/addtocar",
        
    //     data: JSON.stringify(dataadd),
    //     contentType: "application/json",
    //     success: function(datosEntrada,status) {
        
    //         //console.log(datosEntrada);
    //         document.getElementById('nameproductmodal').placeholder = datosEntrada[0].name_prod;
    //         document.getElementById('cantproductmodal').placeholder = 0;
    //         document.getElementById('precioproductmodal').placeholder = datosEntrada[0].precio_venta;
    //         dataprod.idinventario = datosEntrada[0].idinventario;
    //         dataprod.idprod = datosEntrada[0].id_prod;
    //         dataprod.precio_compra = datosEntrada[0].precio_compra;
    //         dataprod.nameprod = datosEntrada[0].name_prod;
    //         console.log(dataprod);       
    //     }
    // });

    // $('#addproducmodal').modal('show');
    
}


document.getElementById('add_prod_venta').addEventListener('click', function() {
    
    //dataprod.nameprod = document.getElementById('nameproductmodal').placeholder;
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

