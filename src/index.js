const { app, BrowserWindow, ipcMain, Notification} = require('electron');
const { deleteFileEmployee,deleteFileProducts } = require('./helpers/storage');
const url = require('url');
const path = require('path');
const db =  require('./config/database');
//Controladores
const loginCtrl = require('./controllers/login.controller');
const prdctsCtrl = require('./controllers/producto.controller')
//Ventanas para abrir
let mainWindow;
let selectOptionWin;
let sellWin;
let fiarWin;
let addProductWin;
let deleteProductWin;
let preguntaClienteWin;
let buscaCliente;
let cierreDeVentaWin;
//Sirve para cargar el contenido cuando esta abierto la app
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules','.bin', 'electron')
});


//VENTANAS
//Ventana de login
function loginWindow () {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'js/login.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        minWidth: 1080,
        width: 1200,
        height:1000
    });  
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
        
    }));
}
//ventana de Select
function selectWindow (){
    selectOptionWin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'js/selectOption.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        minWidth: 1080,
        width: 1200,
        height:1000
    });
    selectOptionWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/selectOption.html'),
        protocol: 'file',
        slashes: true,
    }));
}
//Ventana de Ventas
function sellWindow(){
    sellWin = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload:path.join(__dirname, 'js/sells.js'),
        },
        minWidth: 1080,
        width: 1200,
        height:1000,
    }),
    sellWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/sells.html'),
        protocol: 'file',
        slashes: true,
    }));
}
//Ventana de Fiado
function fiarWindow(){
    fiarWin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'js/fiado.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        minWidth: 1080,
        width: 1200,
        height:1000
    }),
    fiarWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/fiar.html'),
        protocol: 'file',
        slashes: true,
    }));
}
//Ventana Agregar Productos
function addProductoWindow(){
    addProductWin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'js/addProducto.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        minWidth: 500,
        maxWidth: 500,
        minHeight: 500,
        maxHeight: 500,
        width: 700,
        height:450
    })
    addProductWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/agregarProducto.html'),
        protocol: 'file',
        slashes: true,
    }));
}
//Ventana Borrar producto del carrito de compras
function deleteProductWindow(){
    deleteProductWin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'js/deleteProducto.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        minWidth: 500,
        maxWidth: 500,
        minHeight: 500,
        maxHeight: 500,
        width: 700,
        height:450
    })
    deleteProductWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/deleteProducto.html'),
        protocol: 'file',
        slashes: true,
    }));
}

function preguntaClienteWindows(){
    preguntaClienteWin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'js/preguntaClienteWin.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        minWidth: 500,
        maxWidth: 500,
        minHeight: 500,
        maxHeight: 500,
        width: 700,
        height:450
    })
    preguntaClienteWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/preguntaCliente.html'),
        protocol: 'file',
        slashes: true,
    }));
}
//Cierre de Venta
function cierreDeVentaWindows(){
    cierreDeVentaWin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'js/cierreDeVenta.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        minWidth: 1080,
        width: 1200,
        height:1000
    })
    cierreDeVentaWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views/cierreDeVenta.html'),
        protocol: 'file',
        slashes: true,
    }));
}
//Manejadores
//Selection Venta o Fiado
ipcMain.handle('selection', (event,obj) =>{
    if(obj == 1){
        sellWindow();
        sellWin.show();
        selectOptionWin.close();
    }else{
        fiarWindow();
        fiarWin.show();
        selectOptionWin.close();
    }
})
//Login
ipcMain.handle('login', (event, obj) => {
    validateLogin(obj)
});
//Sells
//Abrir Window Agregar Producto
ipcMain.handle('openWindowAddProduct',(event,obj) => {
    addProductoWindow();
    addProductWin.show();
});
//Abrir Window Borrar Producto
ipcMain.handle('openWindowDeleteProduct',(event, obj) =>{
    deleteProductWindow();
    deleteProductWin.show();
});
//Preguntar SI el cliente existe
ipcMain.handle('exitsteFiado',(event,obj) => {
    let {producto, fiado} = obj;
    if(fiado === 1){
        preguntaClienteWindows();
        preguntaClienteWin.show();
    }else{
        cierreDeVentaWindows();
        cierreDeVentaWin.show();
        sellWin.close();
    }
})
//Borrar un prodcuto del carrito de compras
ipcMain.on('deleteProductFromCart', (e,producto) =>{
    sellWin.webContents.send('deleteProducto',producto);
    deleteProductWin.close();
});
//AgregarProducto a la venta
ipcMain.on('addProductoToCart', async (e,producto) => {
    let prod = await prdctsCtrl.saveProducts(producto);
    if(prod === 401){
        new Notification({
            title:"Porducto no encontrado",
            body: 'El codigo del producto esta erroneo'
        }).show()
    }else{
        sellWin.webContents.send('addProducto',prod);
        addProductWin.close();
    }
})
//Funcion para validar el login
validateLogin = async (obj) =>{
    let status = await loginCtrl.singIn(obj);
    if(status !== 200){
        new Notification({
            title:"login",
            body: 'Email o password equivocado'
        }).show()
    }else{
        selectWindow();
        selectOptionWin.show();
        mainWindow.close();
    }
}
//Iniciado de la app
app.whenReady().then(loginWindow);
app.on('window-all-closed', () => {
    loginCtrl.deleteEmployee();
    prdctsCtrl.deleteProducts();
});