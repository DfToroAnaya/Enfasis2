const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const { defaultValueSchemable } = require("sequelize/lib/utils");

const User = sequelize.define(
    "user",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull: {msg:"El nombre es obligatorio"}
            }
        },
        telefono:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull: {msg:"El telfono es obligatorio"}
            }
        }
    },
    {
        timestamps: true,
    }
)

module.exports = User