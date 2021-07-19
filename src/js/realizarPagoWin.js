const { ipcRenderer, ipcMain } = require('electron');

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

    btnSelct.onclick = () =>{
        let opcion = slcPay.value;
        let pago = inputPago.value;
        let objeto = {opcion: opcion, pago: pago};
        ipcRenderer.invoke("mostrarBoleta", objeto);
    }
    
}