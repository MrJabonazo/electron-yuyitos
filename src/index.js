const { app, BrowserWindow, ipcMain, Notification} = require('electron');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage2 = new LocalStorage('./scratch');
const url = require('url');
const path = require('path');
const db =  require('./config/database');
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
            preload:path.join(__dirname, 'login.js'),
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
            preload:path.join(__dirname, 'selectOption.js'),
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
            preload:path.join(__dirname, 'sells.js'),
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
            preload:path.join(__dirname, 'fiado.js'),
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
            preload:path.join(__dirname, 'addProducto.js'),
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
            preload:path.join(__dirname, 'deleteProducto.js'),
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
            preload:path.join(__dirname, 'preguntaClienteWin.js'),
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
            preload:path.join(__dirname, 'cierreDeVenta.js'),
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

//Funciones con conexion a db
//AgregarProducto a la venta
ipcMain.on('addProductoToCart', async (e,producto) => {
    const {codProducto, cantProducto} = producto;
    const sql = "SELECT * FROM PRODUCTO WHERE COD_BRR_PDT = :codProducto";
    const result = await db.Open(sql,[codProducto]);
    let productSearch = result.rows;
    if(productSearch.length === 0){
        new Notification({
            title:"Porducto no encontrado",
            body: 'El codigo del producto esta erroneo'
        }).show()
    }else{
        Producto = [];
        result.rows.map(product =>{
            let prod = {
                "id_prod": product[0],
                "nombre_prod": product[1],
                "marca_prod": product[2],
                "cod_barra": product[3],
                "fch_elab": product[4],
                "fch_vct": product[5],
                "fml_pdt": product[6],
                "tipo_prod": product[7],
                "cant_pqt": product[8],
                "pco_uni": product[9],
                "gmj_pdt": product[10],
                "flag_vgn": product[11],
                "cant_stock": product[12],
                "fech_ingreso": product[13],
                "fech_actualizacion": product[14],
                "proveedor": product[15],
                "descripcion": product[16],
                "cant_deseada": cantProducto
            }
            console.log(prod);
            Producto.push(prod);
        });
    }
    // console.log(Producto);
    sellWin.webContents.send('addProducto',Producto[0]);
    addProductWin.close();
})

//Funcion para validar el login
validateLogin = async (obj) =>{
    const {username, password} = obj;
    const sql = "SELECT * FROM EMPLEADO WHERE USR_EMP = :username AND PSS_EMP = :password ";
    const result = await db.Open(sql,[username, password]);
    let userSearch = result.rows;
    if(userSearch.length === 0){
        new Notification({
            title:"login",
            body: 'Email o password equivocado'
        }).show()
    }
    else if(userSearch.length === 0){
        new Notification({
            title:"login",
            body: 'Usuario esta duplicado'
        }).show()
    }else{
        Usuario= []
        result.rows.map(user =>{
            let userSchema = {
                "rut": user[0],
                "nombre": user[1],
                "p_apellido": user[2],
                "s_apellido": user[3],
                "f_nacimineto": user[4],
                "direccion": user[5],
                "nro_direccion": user[6],
                "estado": user[7],
                "admin": user[8],
                "usuario": user[9],
                "password": user[10],
                "email": user[11],
                "sueldo": user[14],
            }
            Usuario.push(userSchema);
        })
        //Se guarda el rut en una variable de storage
        localStorage2.setItem('rut',Usuario[0].rut);
        selectWindow();
        selectOptionWin.show();
        mainWindow.close();
    }   
}
//Iniciado de la app
app.whenReady().then(loginWindow);
app.on('window-all-closed', () => {
    if(localStorage2.getItem('Productos') || localStorage2.getItem('rut') ){
        localStorage2.clear();
    }
    app.quit();
});