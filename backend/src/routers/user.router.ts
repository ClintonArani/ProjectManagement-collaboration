import { Router } from "express";
import { userController } from "../controllers/user.controller";

const controller = new userController();
const user_router = Router();

user_router.post('/create', controller.createUser);
user_router.get('/all-users', controller.fetchAll);
user_router.put('/switch-role', controller.switchRoles);
user_router.get('/:user_id', controller.fetchSingleUser);

export default user_router;
