CREATE PROCEDURE registerUser
    @id VARCHAR(255),
    @FirstName VARCHAR(255),
    @LastName VARCHAR(255),
    @phone_number VARCHAR(20),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @user_image VARCHAR(255),
    @isAssignedProject BIT, -- Default to 0 if not provided
    @createdAt DATETIME,
    @project_id VARCHAR(255) = NULL -- Optional parameter
AS
BEGIN
    INSERT INTO users (id, FirstName, LastName, phone_number, email, password, user_image, isAssignedProject, role, isCreated, createdAt, project_id)
    VALUES (@id, @FirstName, @LastName, @phone_number, @email, @password, @user_image, 0, 'user', 0, @createdAt, @project_id);
END

DROP PROCEDURE registerUser;