import mssql from 'mssql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Log environment variables to ensure they are loaded
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PWD:', process.env.DB_PWD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('PM_SERVER:', process.env.PM_SERVER);

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: process.env.PM_SERVER as string,
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

async function testConnection() {
  try {
    // Try to establish a connection to the database
    let pool = await mssql.connect(sqlConfig);

    if (pool.connected) {
      console.log("Connection established......");

      // Create the users table if it does not exist
      let usersTable = `
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
        BEGIN
          CREATE TABLE users(
            id VARCHAR(255) PRIMARY KEY,
            FirstName VARCHAR(255) NOT NULL,
            LastName VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            user_image VARCHAR(255) NOT NULL,
            project_id VARCHAR(255),
            isAssignedProject VARCHAR(25)
          )
        END
      `;

      // Execute the table creation query
      let result = await pool.request().query(usersTable);
      console.log('Table creation result:', result);

    } else {
      console.log("Error establishing connection");
    }
  } catch (error) {
    console.error('Connection error:', error);
  }
}

testConnection();
