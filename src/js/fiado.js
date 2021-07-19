const { ipcRenderer } = require("electron");
const { readData, deleteFileData } = require("../helpers/storage");

let clientes = readData("clientes");
deleteFileData("clientes");
let templateSelect = "";
window.onload = () =>{
    let select = document.getElementById("selectRut");
    let btnPagar = document.getElementById("btnPagar");
    let montoAPagar= document.getElementById("monto_Debido");
    let pagarAbono = document.getElementById("pagarAbono");
    let monto = 0;
    let cont = 0;
    for (const item of clientes) {
        cont++;
        templateSelect += `<option value=${item.rut_clt}>${item.rut_clt}</option>`
    }
    select.innerHTML += templateSelect;

    select.onchange = () => {
        let mnt_dbd="";
        if(select.value == 0){
            btnPagar.disabled = true;
            montoAPagar.hidden = true;
            pagarAbono.disabled = true;
        }else{
            for (const item of clientes) {
                if(select.value == item.rut_clt){
                    monto = parseInt(item.mnt_dbd);
                }
            }
            montoAPagar.innerHTML = `<h5>Monto a Pagar $${monto}</h5>`;
            montoAPagar.hidden = false;
            pagarAbono.disabled = false;
        }
    }

    pagarAbono.onkeypress = (evt) =>{
        if(pagarAbono.value == ""){
            btnPagar.disabled = true;
        }else{
            btnPagar.disabled = false;
        }
        validate(evt);
    }

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
    
    btnPagar.onclick = () =>{
        if(pagarAbono.value == ""){
            alert("Valor no valido")
        }else{
            console.log(select.value);
            const obj = {rut:select.value, monto:pagarAbono.value};
            ipcRenderer.invoke("realizarAbono", obj);
        }
    }
}