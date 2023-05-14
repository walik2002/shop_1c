import {Sequelize} from "sequelize";
import mysql from 'mysql2';
export default new Sequelize(
    'shop_1c',
    'root',
    'root',
    {
        dialect: "mysql",
        host: 'localhost',
        port: 3306,
    }
)