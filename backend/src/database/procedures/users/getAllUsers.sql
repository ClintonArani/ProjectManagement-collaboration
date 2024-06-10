CREATE OR ALTER PROCEDURE getAllUsers
AS
BEGIN
    SELECT * FROM Users WHERE role = 'user'
END


Select * from users where role = 'user'