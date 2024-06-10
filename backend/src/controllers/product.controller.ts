import { Request, Response, request, response } from "express";
import { ProjectService } from "../services/project.service";
import { Project } from "../interfaces/project.interface";

let productSetter = new ProjectService();

export let addNewProject = async (req: Request, res: Response) => {
  try {

    let { project_name, project_description, product_end_date } = req.body;
    
    console.log(req.body);

    let result = await productSetter.createProject(req.body);

    console.log('i am after the create project function call');
    

    console.log(result);

    return res.json(result);
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export let fetchAllCreatedProjects = async (req: Request, res: Response) => {
  try {
    let allProjects = await productSetter.getAllProjects();

    return res.status(201).json(
      allProjects
    )
  } catch (error) {
    return res.json({
      error: error
    })
  }
} 

export let updateExistingProject = async (req: Request, res: Response) => {
  
  try {
    let project_id = req.params.project_id;

    let { project_name, project_description, project_end_date } = req.body;

    let updated_object = {
      project_id,
      project_name,
      project_description,
      project_end_date
    }

    let response = await productSetter.updateProject(project_id, updated_object);

    return res.json(response)
  } catch (error) {
    return res.json({
      error: error
    })
  }

}

export const removeProject = async(req: Request, res: Response) => {
  
  try {

    let project_id = req.params.project_id

    let response = await productSetter.deleteProject(project_id);

    return res.json(response);
    
  } catch (error) {
    return res.json({
      error: error
    })
  }

}

export const fetchProjectByID = async (req: Request, res: Response) => {
  
  try {
    let project_id = req.params.project_id;

    let result = await productSetter.getProjectByID(project_id);

    return res.json(result)
  } catch (error) {
    return res.json({
      error: error
    })
  }

}
