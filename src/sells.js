const { ipcRenderer} = require('electron');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage2 = new LocalStorage('./scratch');

let btnAddProduct;
let btnDeleteProduct;
let btnVenta;
let checkFiado;
let productos =  [];
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
        productos = localStorage.getItem("Productos");
        localStorage.clear();
        localStorage2.setItem('Productos',productos);
        if(checkFiado.checked == true){
            check = 1;
        }else{
            check = 0;
        }
        const obj = {productos: productos, fiado: check};
        ipcRenderer.invoke("exitsteFiado",obj)
        
    }
}
