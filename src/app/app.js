const express = require("express");
const cors = require("cors");
const config = require("../config");
const app = express();
const usuarios = require("../routes/usuarios.routes");

//middlewares de configuracion
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config
app.set('port',config.app.port);

//Rutas
app.use("/usuarios/",usuarios);

module.exports = app;