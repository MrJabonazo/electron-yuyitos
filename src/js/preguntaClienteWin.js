const { ipcRenderer} = require('electron');
const { readData, deleteFileData } = require('../helpers/storage');
let btnElegir;
let clientes = readData('clientes');
deleteFileData('clientes');
console.log(clientes);
let templateSelect = "";
window.onload = () =>{
    selectRut.onchange = () => {
        if(selectRut.value != 0){
            btnSelct.disabled = true;
            document.getElementById("groupInput").hidden = true;
        }else{
            btnSelct.disabled = false;
            document.getElementById("groupInput").hidden = false;
        }
    }

    for (const item of clientes) {
        templateSelect += `<option>${item.rut_clt}</option>`
    }
    document.getElementById("selectRut").innerHTML +=templateSelect;

    btnSeleccionar.onclick = () =>{
        
        ipcRenderer.invoke("mostrarBoleta",obj);
    }
}