import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import validateLogin from "../middlewares/validateLogin.js";
const userRoutes = Router();
const userController = new UserController();

//NO NECESITAN VALIDATE LOGIN
userRoutes.post("/login", userController.login);
userRoutes.post("/", userController.createUser);

//EJEMPLO DE COMO USAR UN MIDDLEWARE DIRECTO

userRoutes.get("/", validateLogin, userController.getAllUsers);

//USAR MIDDLEWARE PARA TODAS LAS SIGUIENTES RUTAS

userRoutes.use(validateLogin)
userRoutes.get("/me" ,userController.me);
userRoutes.get("/:id",userController.getUserById);
userRoutes.put("/:id", userController.updateProduct);
userRoutes.delete("/:id",userController.deleteUser);
userRoutes.post("/logout",userController.logout)

export default userRoutes;
