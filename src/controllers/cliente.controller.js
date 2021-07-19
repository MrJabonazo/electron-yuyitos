const db =  require('../config/database');
const {readData} = require("../helpers/storage");
const clntCntrl = {};

clntCntrl.searchCliente = async(request) =>{
    const sql = "SELECT * FROM CLIENTE";
    const result = await db.Open(sql,[]);
    let clientSearch = result.rows;
    if(clientSearch.length === 0){
        return 401;
    }else{
        Cliente = [];
        result.rows.map(cliente =>{
            let clientSchema = {
                "rut_clt": cliente[0],
                "nom_clt": cliente[1],
                "p_apellido_clt": cliente[2],
                "s_apellido_clt": cliente[3],
                "cod_com": cliente[4],
                "direccion": cliente[5],
                "nro_direccion": cliente[6],
                "estado": cliente[7],
                "fcc_ing": cliente[8],
                "fch_act": cliente[9],
                "mnt_dbd": cliente[10],
                "fch_abn": cliente[11],
                "fch_lim": cliente[14],
            }
            Cliente.push(clientSchema);
        });
        return Cliente;
    }
}

clntCntrl.searchClienteHabilitado = async(request) =>{
    const sql = "SELECT * FROM CLIENTE WHERE FLG_STD = 1 ";
    const result = await db.Open(sql,[]);
    let clientSearch = result.rows;
    if(clientSearch.length === 0){
        return 401;
    }else{
        Cliente = [];
        result.rows.map(cliente =>{
            let clientSchema = {
                "rut_clt": cliente[0],
                "nom_clt": cliente[1],
                "p_apellido_clt": cliente[2],
                "s_apellido_clt": cliente[3],
                "cod_com": cliente[4],
                "direccion": cliente[5],
                "nro_direccion": cliente[6],
                "estado": cliente[7],
                "fcc_ing": cliente[8],
                "fch_act": cliente[9],
                "mnt_dbd": cliente[10],
                "fch_abn": cliente[11],
                "fch_lim": cliente[14],
            }
            Cliente.push(clientSchema);
        });
        return Cliente;
    }
}

clntCntrl.searchClienteDeudor = async(request) =>{
    const sql = "SELECT * FROM CLIENTE WHERE MNT_DBD > 0 ";
    const result = await db.Open(sql,[]);
    let clientSearch = result.rows;
    if(clientSearch.length === 0){
        return 401;
    }else{
        Cliente = [];
        result.rows.map(cliente =>{
            let clientSchema = {
                "rut_clt": cliente[0],
                "nom_clt": cliente[1],
                "p_apellido_clt": cliente[2],
                "s_apellido_clt": cliente[3],
                "cod_com": cliente[4],
                "direccion": cliente[5],
                "nro_direccion": cliente[6],
                "estado": cliente[7],
                "fcc_ing": cliente[8],
                "fch_act": cliente[9],
                "mnt_dbd": cliente[10],
                "fch_abn": cliente[11],
                "fch_lim": cliente[14],
            }
            Cliente.push(clientSchema);
        });
        return Cliente;
    }
}

clntCntrl.pagarDeuda = async (request) =>{
    try{
        const {rut, monto} = request;
        let montoDebe = "";
        const sql = "INSERT INTO ABONO (ID_ABN, MNT_ABN,FCH_ABN,CLT_RUT_CLT, FLG_STD) VALUES (NULL, :monto, sysdate, :rut, 1)"
        await db.Open(sql,[monto,rut]);
        for (const items of readData("clientes")) {
            if(rut == items.rut_clt){
                montoDebe = items.mnt_dbd;
            }
        }
        const sql2 = "UPDATE CLIENTE SET MNT_DBD=:montoDebe-:monto where RUT_CLT=:rut";
        await db.Open(sql2,[parseInt(montoDebe),monto,rut]);
        return 200;
    }catch{
        return 401;
    }
}
module.exports = clntCntrl;