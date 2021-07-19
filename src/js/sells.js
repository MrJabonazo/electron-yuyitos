const { ipcRenderer} = require('electron');
const { saveData } = require('../helpers/storage');

let btnAddProduct;
let btnDeleteProduct;
let btnVenta;
let checkFiado;
let check;

window.onload = () =>{
    // localStorage.setItem("Productos");

    btnAddProduct = document.getElementById('addProduct');
    btnDeleteProduct = document.getElementById('deleteProducto');
    btnVenta = document.getElementById("btnVenta");
    checkFiado = document.getElementById("checkFiado");

    btnAddProduct.onclick = function(){
        const obj = btnAddProduct.value;
        ipcRenderer.invoke("openWindowAddProduct", obj);
    }

    btnDeleteProduct.onclick = function(){
        const obj = btnDeleteProduct.value;
        ipcRenderer.invoke("openWindowDeleteProduct", obj);
    }

    btnVenta.onclick = function(){
        productosCarrito = JSON.parse(localStorage.getItem("Productos"));
        saveData(productosCarrito,'productos');
        localStorage.clear();
        if(checkFiado.checked == true){
            check = 1;
        }else{
            check = 0;
        }
        const obj = {fiado: check};
        ipcRenderer.invoke("exitsteFiado",obj)
    }
}
