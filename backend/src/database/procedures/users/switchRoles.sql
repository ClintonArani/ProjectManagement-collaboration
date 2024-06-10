CREATE OR ALTER PROCEDURE switchRoles
    @user_id VARCHAR(255)
AS
BEGIN
    -- Update the user's role based on the provided user_id
    UPDATE users SET role = 'user' WHERE id = @user_id;
END
