import { Router } from "express";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";
const routes = Router();

// Seccion de link de productos
routes.use("/products", productRoutes);
routes.use("/users", userRoutes);

export default routes;