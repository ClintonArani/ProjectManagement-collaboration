import mssql from 'mssql';
import dotenv from 'dotenv';
import { sqlConfig } from '../config/sql.config';
import path from 'path';
import ejs from 'ejs';
import { sendMail } from '../helpers/email.helper';

dotenv.config();

export const assignedProject = async () => {
    const pool = await mssql.connect(sqlConfig);

    const users = (await pool.request().query('SELECT * FROM Users WHERE project_id IS NOT NULL AND isAssignedProject = 0')).recordset;

    for (let user of users) {
        const project = (await pool.request().query(`SELECT * FROM project_table WHERE project_id = '${user.project_id}'`)).recordset[0];

        if (project) {
            const templatePath = path.resolve(__dirname, '../../templates/assignedProject.ejs');
            ejs.renderFile(templatePath, {
                userName: user.FirstName,
                projectName: project.project_name,
                projectDescription: project.project_description,
                projectEndDate: project.project_end_date
            }, async (error, data) => {
                if (error) {
                    console.log('Error rendering EJS template', error);
                    return;
                }
                let messageOptions = {
                    from: process.env.EMAIL as string,
                    to: user.email,
                    subject: 'New Project ',
                    html: data
                }

                try {
                    console.log("Sending project assignment email to:", user.email);
                    await sendMail(messageOptions);

                    await pool.request().query(`UPDATE Users SET isAssignedProject = 1 WHERE id = '${user.id}'`);

                    console.log('Email sent and database updated for user:', user.id);
                } catch (error) {
                    console.log('Error in sending email or updating database:', error);
                }
            });
        }
    }
}
