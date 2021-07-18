const { ipcRenderer } = require('electron');

let inputCodProducto;
let inputCantProducto;
let btnAddProducto;

window.onload = () =>{
    btnAddProducto = document.getElementById('btnAddProducto');

    btnAddProducto.onclick = function(){
        inputCodProducto = document.getElementById('codProducto').value;
        inputCantProducto = document.getElementById('amount').value;
        const producto =  {codProducto: inputCodProducto, cantProducto: inputCantProducto};
        ipcRenderer.send('addProductoToCart',producto);
    }
}