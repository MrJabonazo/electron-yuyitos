const { ipcRenderer } = require('electron');

let inputCodProducto;
let inputCantProducto;
let btnDeleteProducto;

window.onload = () =>{
    btnDeleteProducto = document.getElementById('deleteProducto');

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

    btnDeleteProducto.onclick = function(){
        inputCodProducto = document.getElementById('codProducto').value;
        inputCantProducto = document.getElementById('amount').value;
        const producto =  {codProducto: inputCodProducto, cantProducto: inputCantProducto};
        ipcRenderer.send('deleteProductFromCart',producto);
    }
}