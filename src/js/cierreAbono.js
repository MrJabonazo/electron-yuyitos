const {ipcRenderer} = require("electron");

window.onload = () =>{
    let btnVolver = document.getElementById("btnVolver");
    btnVolver.onclick = () =>{
        ipcRenderer.invoke("volverEleccion");
    }
}