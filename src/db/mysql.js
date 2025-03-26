const mysql = require("mysql2");
const config = require("../config");

const dbconfig = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function conMysql(){
    connection = mysql.createConnection(dbconfig);
    connection.connect((err)=>{
        if(err){
            console.log("Error en la conexion con la base de datos");
            return;
        }
        console.log("conexion con la base de datos en id :" + connection.threadId);
    });
}

conMysql();

function query(sql, callback){
    connection.query(sql, (err,result)=>{
    if(err){
        console.log("error al ejecutar la consulta"+err.stack);
        return;
    }
    callback(result);
    });
}

function findAll(tabla){
    return new Promise((resolve, reject)=>{
        query(`select * from ${tabla}`,(result)=>{
            resolve(result);
        });
    });
}

function findById(tabla,id){
    return new Promise((resolve, reject)=>{
        query(`select * from ${tabla} WHERE id = ${id}`,(result)=>{
            resolve(result);
        });
    });
}

function findByName(tabla,name){
    return new Promise((resolve, reject)=>{
        query(`select * from ${tabla} WHERE nombre="${name}"`,(result)=>{
            resolve(result);
        });
    });
}

module.exports = {
    findAll,
    findById,
    findByName
}