const Auth = require("../models/auth.model");
const response = require("../res/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ where: { email } });

        if (!user) {
            return response.success(req, res, { msg: "Usuario no encontrado" }, 404);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return response.success(req, res, { msg: "Contraseña incorrecta" }, 401);
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        const data = {
            msg: "Login exitoso",
            token: token
        };

        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
}