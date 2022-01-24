/// CARRITO COMPRAS //

var dataadd = {
    id: '0',
};

var dataedit = {
    id: '0',
};

var dataupdate = {
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

var dataupdatefactura = {};



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
            document.getElementById('cantproductmodal').value = 1;
            document.getElementById('precioproductmodal').value = datosEntrada[0].precio_venta;
            dataprod.idinventario = datosEntrada[0].idinventario;
            dataprod.idprod = datosEntrada[0].id_prod;
            dataprod.precio_compra = datosEntrada[0].precio_compra;
            dataprod.nameprod = datosEntrada[0].name_prod;
            console.log(dataprod);       
        }
    });

    $('#addproducmodal').modal('show');
    
}


function obtener_update_factura(id){
    
    dataupdate.id = id;
    console.log("Envio",dataupdate)

    $.post({
        url: "/mostrar_item_factura",
        
        data: JSON.stringify(dataupdate),
        contentType: "application/json",
        success: function(datosEntrada,status) {
        
            //console.log(datosEntrada);
            document.getElementById('nameproductmodal_edit').placeholder = datosEntrada.nameprod;
            document.getElementById('cantproductmodal_edit').value = datosEntrada.cant;
            document.getElementById('precioproductmodal_edit').value = datosEntrada.precio_vent;
            dataupdatefactura = datosEntrada;
            console.log(dataupdatefactura);
        }
    });

    $('#editproducmodal').modal('show');
    
}


function obtener_edit_factura(id){
    
    dataedit.id = id;
    console.log("Envio",dataedit.id);

    $.post({
        url: "/delete_item_factura",
        
        data: JSON.stringify(dataedit),
        contentType: "application/json",
        success: function(datosEntrada,status) {
            if(datosEntrada === "Ok") {
                window.location.replace("/ventas");
            }      
        }
    });
    
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



document.getElementById('edit_prod_venta').addEventListener('click', function() {
    

    dataupdatefactura.cant = document.getElementById('cantproductmodal_edit').value;
    dataupdatefactura.precio_vent = document.getElementById('precioproductmodal_edit').value;

    console.log(dataupdatefactura);

    $.post({
        url: "/update_item_factura",
        
        data: JSON.stringify(dataupdatefactura),
        contentType: "application/json",
        success: function(datosEntrada,status) {
        
            window.location.replace("/ventas");
            
        }
    });
});

