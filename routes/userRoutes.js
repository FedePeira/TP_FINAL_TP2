import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import validateLogin from "../middlewares/validateLogin.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";

const userRoutes = Router();
const userController = new UserController();

//NO NECESITAN VALIDATE LOGIN
userRoutes.post("/login", userController.login);
userRoutes.post("/", userController.createUser);


//USAR MIDDLEWARE PARA TODAS LAS SIGUIENTES RUTAS

userRoutes.use(validateLogin)

userRoutes.get("/me" ,userController.me);
userRoutes.get("/:id",userController.getUserById);
userRoutes.post("/logout",userController.logout)

userRoutes.use(validateAdmin)

userRoutes.get("/", userController.getAllUsers);
userRoutes.put("/:id", userController.updateProduct);
userRoutes.delete("/:id",userController.deleteUser);

export default userRoutes;
