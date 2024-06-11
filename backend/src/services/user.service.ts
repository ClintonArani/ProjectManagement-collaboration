import lodash from 'lodash'
import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcryptjs'

import { sqlConfig } from '../config/sql.config';
import { User, changes } from '../interfaces/user.interface';



export class userService{
    [x: string]: any;
    async fetchSingleUser(user_id: string) {
        let pool = await mssql.connect(sqlConfig);

        let result = (await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .execute("fetchSingleUser")).recordset;

        if (result.length === 0) {
            return {
                error: "User not found"
            };
        } else {
            return {
                user: result[0]
            };
        }
    }
    async switchRoles(user_id: string) {
        let pool = await mssql.connect(sqlConfig);

        let result = (await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .execute("switchRoles")).rowsAffected;

        if (result[0] === 1) {
            return {
                message: "Role switched successfully"
            };
        } else {
            return {
                error: "Unable to switch role"
            };
        }
    }

    async registerUser(user: User) {
        let pool = await mssql.connect(sqlConfig);

        let user_id = v4();
        let hashedPassword = bcrypt.hashSync(user.password, 6);
        let createdAt = new Date();  // Set the current timestamp

        if (pool.connected) {
            // Check if email exists
            let emailExists = (await pool.request().query(`SELECT * FROM Users WHERE email = '${user.email}'`)).recordset;

            if (!lodash.isEmpty(emailExists)) {
                return {
                    error: "Email already in use"
                };
            }

            let phoneNoExists = (await pool.request().query(`SELECT * FROM Users WHERE phone_number = '${user.phone_number}'`)).recordset;

            if (!lodash.isEmpty(phoneNoExists)) {
                return {
                    error: "Phone number already in use"
                };
            }

            let result = (await pool.request()
                .input("id", mssql.VarChar, user_id)
                .input("FirstName", user.FirstName)
                .input("LastName", user.LastName)
                .input("phone_number", user.phone_number)
                .input("email", user.email)
                .input("password", hashedPassword)  // Use hashed password here
                .input("user_image", user.user_image)
                .input("project_id", user.project_id)
                .input("isAssignedProject", user.isAssignedProject)
                .input("createdAt", mssql.DateTime, createdAt)  // Provide the current timestamp
                .execute("registerUser")).rowsAffected;

            if (result[0] == 1) {
                return {
                    message: "Account created successfully"
                };
            } else {
                return {
                    error: "Unable to create Account"
                };
            }
        } else {
            return {
                error: "Unable to establish connection"
            };
        }
    }

    async fetchAllUsers(){
        let pool = await mssql.connect(sqlConfig)

        let result = (await pool.request().execute("getAllUsers")).recordset

        if(result.length == 0){
            return{
                message: "No users at the moment"
            }
        }else{
            return{
                users: result
            }
        }
    }

    async fetchUnsignedUsers() {

        let pool = await mssql.connect(sqlConfig);

        let result = (await pool.request().query(`select * from users where isAssignedProject = 0 `)).recordset;

        if (result.length < 1) {
            return {
                message: "All users present have been assigned projects"
            }
        }
        else {
            return {
                users: result
            }
        }
    }

    async setUserToAssigned(changes:changes) {

        let user_id = changes.user_id;
        let project_id = changes.project_id

        let pool = await mssql.connect(sqlConfig);

        let result = (await pool.request().query(`update users set isAssignedProject = 1, project_id = '${project_id}'
            where id = '${user_id}'`)).rowsAffected;
        
        if (result[0] < 1) {
            return {
                error: "Unable to assign the project specified to the user"
            }
        }

        else {
            return {
                message: "Assigning of project successfull."
            }
        }

    }

}