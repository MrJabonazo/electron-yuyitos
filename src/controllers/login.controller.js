const db =  require('../config/database');
const { saveData, deleteFileData } =  require('../helpers/storage');
const loginCtrl = {};

loginCtrl.singIn = async(request)=>{
    const {username, password} = request;
    const sql = "SELECT * FROM EMPLEADO WHERE USR_EMP = :username AND PSS_EMP = :password ";
    const result = await db.Open(sql,[username, password]);
    let userSearch = result.rows;
    if(userSearch.length === 0){
        return 401;
    } else if(userSearch.length > 1){
        return 401;
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
        });
        //Se guarda el rut en una variable de storage
        let rut = Usuario[0].rut
        saveData(rut,'empleado');
        return 200;
    }   
}

loginCtrl.deleteEmployee = () =>{
    deleteFileData('empleado');
}

module.exports = loginCtrl;