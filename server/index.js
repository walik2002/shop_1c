import 'dotenv/config';
import express from 'express';
import sequelize from './db.js';

import router from "./routes/index.js";
import cors from 'cors';
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";



const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',router);

app.use(errorHandler);

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