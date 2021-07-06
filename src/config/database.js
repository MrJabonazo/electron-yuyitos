const oracledb = require('oracledb');
const config = require('./default');

oracledb.autoCommit = true;
cns = {
    user: `${config.oracleDB.user}`,
    password: `${config.oracleDB.pass}`,
    connectString: `localhost/XE`
}


async function Open(sql, binds) {
    let conn;
    try{
        conn = await oracledb.getConnection(cns);
        result = await conn.execute(sql,binds);
        conn.release();
        return result;
    }catch(err){
        console.error(err);
    }
}


exports.Open = Open;