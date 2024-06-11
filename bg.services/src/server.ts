import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron'
import { welcomeUser } from './services/welcomeUser';
import { assignedProject } from './services/assignedProject';

dotenv.config()

const app = express();

const run = async()=>{
    cron.schedule('*/2 * * * *',async()=>{
        console.log('checking the database for new users');
        await welcomeUser();
    })

    cron.schedule('*/2 * * * *', async () => {
        console.log('Checking the database for assigned projects');
        await assignedProject();
    });


}
run();
const port = process.env.PORT ;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}` )


})