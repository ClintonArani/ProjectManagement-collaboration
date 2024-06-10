import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { mail_configs } from '../interfaces/mail.configs';

dotenv.config();

//create a transporter

const createTransporter = (configs:mail_configs)=>{
    const transporter = nodemailer.createTransport(configs);
    return transporter;
}

let configurations: any = ({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port: 587,
    auth:{
        user: process.env.EMAIL as string,
        pass: process.env.PASSWORD as string
    }
})

export const sendMail = async(messageOptions:any)=>{
    const transporter = await createTransporter(configurations);

    await transporter.verify()
    
    await transporter.sendMail(messageOptions,(error,info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(info.response);
        }

    })
}