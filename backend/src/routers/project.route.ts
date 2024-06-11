import { Router } from "express";
import { addNewProject, assignProject, fetchAllCreatedProjects, fetchProjectByID, getUnAssignedProjects, removeProject, updateExistingProject } from "../controllers/product.controller";

export let my_route = Router();


my_route.post('/new-project', addNewProject);
my_route.get('/all-projects', fetchAllCreatedProjects);
my_route.get('/unassigned-projects', getUnAssignedProjects);
my_route.put('/assign-project/:project_id', assignProject);
my_route.put('/update-project/:project_id', updateExistingProject);
my_route.delete('/delete-project/:project_id', removeProject);
my_route.get('/one-project/:project_id', fetchProjectByID);