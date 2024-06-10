import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron'
import { welcomeUser } from './services/welcomeUser';

dotenv.config()

const app = express();

const run = async()=>{
    cron.schedule('*/5 * * * *',async()=>{
        console.log('checking the database for new users');
    })

    welcomeUser();

}
run();
const port = process.env.PORT ;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}` )


})