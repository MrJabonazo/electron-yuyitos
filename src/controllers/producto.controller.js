
const db =  require('../config/database');
const { deleteFileData } = require('../helpers/storage');
const prdctsCtrl = {};

prdctsCtrl.saveProducts = async (request) =>{
    const {codProducto, cantProducto} = request;
    const sql = "SELECT * FROM PRODUCTO WHERE COD_BRR_PDT = :codProducto";
    const result = await db.Open(sql,[codProducto]);
    let productSearch = result.rows;
    if(productSearch.length === 0){
        return 401;
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
            Producto.push(prod);
        });
        return Producto[0]; 
    }
}

prdctsCtrl.deleteProducts = () =>{
    deleteFileData("productos");
}
module.exports = prdctsCtrl;