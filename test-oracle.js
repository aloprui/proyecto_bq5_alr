const oracledb = require("oracledb");
async function test() {
 try {
 const conn = await oracledb.getConnection({
 user: "TIENDA",
 password: "tienda",
 connectString: "localhost:1521/XEPDB1"
 });
 console.log("Oracle conectado correctamente");
 await conn.close();
 } catch (e) {
 console.error("Error:", e.message);
 }
}
test();