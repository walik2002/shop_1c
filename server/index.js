import express from 'express';
import dotenv from "dotenv";
import sequelize from './db.js';
import models from './models/models.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

async function start (){
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))
    }
    catch (e){
        console.log(e);
    }
}

start();