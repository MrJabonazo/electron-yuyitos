const { ipcRenderer } = require('electron');

let btnVentas;
let btnFiados; 

window.onload = () =>{

    btnVentas = document.getElementById('ventas');
    btnFiados = document.getElementById('fiados');

    btnVentas.onclick =  function(){
        const obj = btnVentas.value;
        ipcRenderer.invoke("selection", obj);
    }

    btnFiados.onclick =  function(){
        const obj = btnFiados.value;
        ipcRenderer.invoke("selection", obj);
    }

}