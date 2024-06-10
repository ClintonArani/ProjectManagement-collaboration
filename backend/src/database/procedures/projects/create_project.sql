CREATE OR ALTER PROCEDURE create_new_project(
    @project_id VARCHAR(255),
    @project_name VARCHAR(100),
    @project_description VARCHAR(255),
    @project_end_date VARCHAR (50)
)
AS
BEGIN
      INSERT INTO project_table(project_id, project_name, project_description, project_end_date)
      VALUES(@project_id, @project_name, @project_description, @project_end_date)
END