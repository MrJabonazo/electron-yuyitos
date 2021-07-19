const fs = require('fs');

//prueba
let jsonUrl = "";
//Empelado Storage
const saveData = (data,url) => {  
    jsonUrl = `./storage/${url}.json`;
    fs.writeFileSync(jsonUrl, JSON.stringify(data));
}

const readData = (url) => {
    jsonUrl = `./storage/${url}.json`;
    if(!fs.existsSync(jsonUrl)){
        return null;
    }
    const info = fs.readFileSync(jsonUrl, {encoding: 'utf8'});
    const data = JSON.parse(info);
    return data;
}

const deleteFileData = (url) =>{
    jsonUrl = `./storage/${url}.json`;
    fs.writeFileSync(jsonUrl, "");
}

module.exports = {
    saveData,
    readData,
    deleteFileData
};