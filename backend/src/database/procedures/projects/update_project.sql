CREATE OR ALTER PROCEDURE update_existing_project(
      @project_id VARCHAR(255),
      @project_name VARCHAR(100),
      @project_description VARCHAR(255),
      @project_end_date VARCHAR (50)
)
    AS

  BEGIN

        UPDATE project_table SET project_id = @project_id, project_name = @project_name, project_description = @project_description, project_end_date = @project_end_date
        WHERE project_id = @project_id

  END
