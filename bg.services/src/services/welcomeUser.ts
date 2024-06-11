import mssql from 'mssql';
import dotenv from 'dotenv';
import { sqlConfig } from '../config/sql.config';
import path from 'path';
import ejs from 'ejs';
import { sendMail } from '../helpers/email.helper';

dotenv.config();

export const welcomeUser = async()=>{
    const pool = await mssql.connect(sqlConfig);

    const users = (await pool.request().query('select * from Users WHERE isCreated=0')).recordset;


    for(let user of users){
        const templatePath= path.resolve(__dirname,'../../templates/welcomeUser.ejs')
        ejs.renderFile(templatePath,{userName:user.FirstName},async(error,data)=>{
            if(error){
                console.log('Error rendering EJS template',error);
                return;
            }
            let messageOptions = {
                from: process.env.EMAIL as string,
                to: user.email,
                subject: 'Welcome to ProjectPulse',
                html: data
            }

            try{
                console.log("Something")
                await sendMail(messageOptions);

                await pool.request().query(`UPDATE Users SET isCreated=1 WHERE id='${user.id}'`)

                console.log('Email sent to new users',user.mail)
            }
            catch(error){
                console.log('Error in sending email or updating database:',error)
            }
        })
    }
}