import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const UserRouter = Router();

const controller = new UserController();

UserRouter.get("/users", controller.getAll.bind(controller));
UserRouter.get("/users/:id", controller.getOne.bind(controller));
UserRouter.post("/users", controller.create.bind(controller));
UserRouter.put("/users/:id", controller.update.bind(controller));
UserRouter.delete("/users/:id", controller.delete.bind(controller));

export default UserRouter;
