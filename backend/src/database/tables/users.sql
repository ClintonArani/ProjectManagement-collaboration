CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_image VARCHAR(255) NOT NULL,
  isAssignedProject BIT DEFAULT 0, -- Set default to 0
  role VARCHAR(50) DEFAULT 'user',
  isCreated BIT DEFAULT 0,
  createdAt DATETIME NOT NULL, -- Use DATETIME for timestamps
  project_id VARCHAR(255) NULL DEFAULT NULL,
  FOREIGN KEY (project_id) REFERENCES project_table(project_id)
);

select * from users

drop table users;