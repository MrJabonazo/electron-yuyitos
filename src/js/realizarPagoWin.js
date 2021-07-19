const { ipcRenderer } = require('electron');
const { readData } = require("../helpers/storage");
let btnSelct, slcPay, inputPago;

window.onload = () =>{
    btnSelct = document.getElementById("btnSeleccionar");
    inputPago = document.getElementById("pagoMonto");
    slcPay = document.getElementById("selectRut");

    validate =(evt) => {
        var theEvent = evt || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    
    slcPay.onchange = () => {
        if(slcPay.value != 1){
            btnSelct.disabled = true;
            document.getElementById("groupInput").hidden = true;
        }else{
            btnSelct.disabled = false;
            document.getElementById("groupInput").hidden = false;
        }
    }
    let monto = 0;
    for (const item of readData("productos")) {
        monto += (item.pco_uni*item.cant_deseada);
    }   

    btnSelct.onclick = () =>{
        let opcion = slcPay.value;
        let pago = inputPago.value;
        let objeto = {opcion: opcion, pago: pago};
        if(inputPago.value < monto){
            alert("El monto a pagar es mucho mayor al ingresado");
        }else{
            ipcRenderer.invoke("mostrarBoleta", objeto);
        }
    }
    
}