import mssql, { pool } from 'mssql';
import {v4} from 'uuid'
import { Project } from '../interfaces/project.interface';


import lodash from 'lodash';
import { sqlConfig } from '../config/sql.config';

export class ProjectService {

  async createProject(project: Project) {

    let pool = await mssql.connect(sqlConfig);

    let result = await (await pool.request()
      .input("project_id", v4())
      .input("project_name", project.project_name)
      .input("project_description", project.project_description)
      .input("project_end_date", project.project_end_date)
      .execute("create_new_project")).rowsAffected;
    
    console.log(result);

    if (result[0] == 1) {
      return {
        message: "Project created successfully"
      }
    }
    else {
      return {
        error: "Unable to create project ..."
      }
    }
    

  }

  async getAllProjects() {
    let pool = await mssql.connect(sqlConfig);

    let response = (await pool.request().query('SELECT * FROM project_table')).recordset;

    return {
      projects: response
    }
  }

  async updateProject(project_id: string, project: Project) {

    let pool = await mssql.connect(sqlConfig);

    let projectExists = await (await pool.request().query(`SELECT * FROM project_table WHERE project_id = '${project_id}'`)).recordset;

    console.log(projectExists);

    if (lodash.isEmpty(projectExists)) {
      return {
        error: "Sorry, project not found ..."
      }
    }

    else {
      
      let result = (await pool.request()
        .input("project_id", projectExists[0].project_id)
        .input("project_name", project.project_name)
        .input("project_description", project.project_description)
        .input("project_end_date", project.project_end_date)
        .execute("update_existing_project")).rowsAffected;
      
      if (result[0] < 1) {
        return {
          error: "Was not able to update the project ..."
        }
      }

      else {
        return {
          message: "Updated project successfully ..."
        }
      }

    }
    

  }

  async deleteProject(project_id: string) {

    let pool = await mssql.connect(sqlConfig);

    let response = await (await pool.request().query(`SELECT * FROM project_table WHERE project_id = '${project_id}'`)).recordset;

    if (response.length < 1) {
      return {
        error: "The project specified is not found ..."
      }
    }
    else {
      await pool.request().query(`DELETE FROM project_table WHERE project_id = '${project_id}'`);
      return {
        message: "Project(s) deleted successfully ..."
      }
    }

  }

  async getProjectByID(project_id: string) {
    
    let pool = await mssql.connect(sqlConfig);

    let response = await (await pool.request().query(`SELECT * FROM project_table WHERE project_id = '${project_id}'`)).recordset;

    if (response.length < 1) {
      return {
        error: "Sorry there are no results for the project specified."
      }
    }
    else {
      return {
        project: response[0]
      }
    }

  }

}