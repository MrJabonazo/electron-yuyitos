const db =  require('../config/database');
const { readData } = require('../helpers/storage');
const ventCntrl = {};

ventCntrl.realizarVenta = async() =>{
    let products = readData("productos");
    let rutEmp = readData("empleado");
    let monto = 0, monto_iva = 0,monto_total = 0;
    for (const item of products) {  
        monto += (parseInt(item.cant_deseada)*parseInt(item.pco_uni));
    }
    
    const sql = "INSERT INTO VENTA (ID_VNT, FCH_VNT, TTL_CMP, TTL_IVA, TTL_BTO, EMP_RUT_EMP,STD_VNT,FLG_PGD) VALUES (null, sysdate, :monto, 0, :monto,:rutEmp,1,1 )";
    await db.Open(sql,[monto,monto,rutEmp]);
    return 200;
}

ventCntrl.realizarBlta = async () =>{
    let products = readData("productos");
    let id_venta = await ventCntrl.searchAllVentas();
    let cont = 0;
    for (const item of id_venta) {
        cont++;
    }
    let id_prod = 0;
    for (const item of products) {
        id_prod = parseInt(item.id_prod);
        let cod_bol = `bol${item.id_prod}${item.cant_deseada}${cont}`
        const sql = "INSERT INTO BOLETA (COD_BLT, VNT_ID_VNT, PDT_ID_PDT) VALUES (:cod_bol,:id_venta, :id_prod)"
        await db.Open(sql,[cod_bol, cont.toString(), id_prod]);
    }
    return 200;
}

ventCntrl.searchAllVentas = async()=>{
    const sql = "SELECT * FROM VENTA";
    const result = await db.Open(sql,[]);
    let ventaRows = result.rows;
    return ventaRows;
}

module.exports = ventCntrl;