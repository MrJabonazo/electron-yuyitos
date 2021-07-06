const { ipcRenderer } = require('electron');

let inputCodProducto;
let inputCantProducto;
let btnDeleteProducto;

window.onload = () =>{
    btnDeleteProducto = document.getElementById('deleteProducto');

    btnDeleteProducto.onclick = function(){
        inputCodProducto = document.getElementById('codProducto').value;
        inputCantProducto = document.getElementById('amount').value;
        const producto =  {codProducto: inputCodProducto, cantProducto: inputCantProducto};
        ipcRenderer.send('deleteProductFromCart',producto);
    }
}