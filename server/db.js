import {Sequelize} from "sequelize";
import mysql from 'mysql2';
export default new Sequelize(
    process.env.DB_NAME ,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)