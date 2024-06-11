import mssql from 'mssql';
import dotenv from 'dotenv';
import { sqlConfig } from '../config/sql.config';
import path from 'path';
import ejs from 'ejs';
import { sendMail } from '../helpers/email.helper';
import { v4 as uuidv4 } from 'uuid';

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
                
                await sendMail(messageOptions);

                await pool.request().query(`UPDATE Users SET isCreated=1 WHERE id='${user.id}'`)

                //insert notification
                const notification_id = uuidv4();
                const createdAt = new Date();
                await pool.request()
                    .input("id", mssql.VarChar, notification_id)
                    .input("user_id", mssql.VarChar, user.id)
                    .input("message", mssql.Text, "Welcome to ProjectPulse!")
                    .input("type", mssql.VarChar, "user_registration")
                    .input("is_read", mssql.Bit, 0)
                    .input("created_at", mssql.DateTime, createdAt)
                    .query(`INSERT INTO notifications (id, user_id, message, type, is_read, created_at)
                            VALUES (@id, @user_id, @message, @type, @is_read, @created_at)`);


                console.log('Email sent to new users',user.mail)
            }
            catch(error){
                console.log('Error in sending email or updating database:',error)
            }
        })
    }
}