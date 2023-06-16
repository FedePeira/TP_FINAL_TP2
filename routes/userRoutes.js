import { Router } from "express";
import UserController from "../Controllers/UserController.js";
const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateProduct);
userRoutes.post("/login", userController.login);
userRoutes.post("/", userController.createUser);
userRoutes.delete("/:id");

export default userRoutes;
