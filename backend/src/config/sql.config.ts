import mssql from 'mssql';
import dotenv, { config } from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: process.env.MS_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

// async function testConnection() {
//   try {
//     // Try to establish a connection to the database
//     let pool = await mssql.connect(sqlConfig);

//     if (pool.connected) {
//       console.log("Connection established......");

//       // Create the users table if it does not exist
//       let usersTable = 'CREATE TABLE users (id VARCHAR(255) PRIMARY KEY,FirstName VARCHAR(255) NOT NULL,LastName VARCHAR(255) NOT NULL,phone_number VARCHAR(20) NOT NULL,email VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,user_image VARCHAR(255) NOT NULL,isAssignedProject VARCHAR(255) DEFAULT 0,role VARCHAR(50) DEFAULT user,createdAt VARCHAR(255) NOT NULL,project_id VARCHAR(255),FOREIGN KEY (project_id) REFERENCES projects(project_id))'

//       // Execute the table creation query
//       let result = await pool.request().query(usersTable);
//       console.log('Table creation result:', result);

//     } else {
//       console.log("Error establishing connection");
//     }
//   } catch (error) {
//     console.error('Connection error:', error);
//   }
// }

// testConnection();
