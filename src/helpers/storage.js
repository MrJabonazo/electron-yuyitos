const fs = require('fs');
const empleado = './storage/empleado.json';
const productos = './storage/productos.json'
//Empelado Storage
const saveEmployee = (data) => {   
    fs.writeFileSync(empleado, JSON.stringify(data));
}

const readEmployees = () => {
    if(!fs.existsSync(empleado)){
        return null;
    }
    const info = fs.readFileSync(empleado, {encoding: 'utf8'});
    const data = JSON.parse(info);
    return data;
}

const deleteFileEmployee = () =>{
    fs.writeFileSync(empleado, "");
}
//Productos Storage
const saveProducts = (data) => {   
    fs.writeFileSync(productos, JSON.stringify(data));
}

const readProducts = () => {
    if(!fs.existsSync(productos)){
        return null;
    }
    const info = fs.readFileSync(productos, {encoding: 'utf8'});
    const data = JSON.parse(info);
    return data;
}

const deleteFileProducts = () =>{
    fs.writeFileSync(productos, "");
}

module.exports = {
    saveEmployee,
    readEmployees,
    deleteFileEmployee,
    saveProducts,
    readProducts,
    deleteFileProducts
};