import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";
import validateLogin from "../middlewares/validateLogin.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";
const productRoutes= Router();
const productController= new ProductController();

// Llamados segun el link
productRoutes.get("/", productController.getAllProduct);
productRoutes.get("/:categoryId", productController.getProductByCategory);
productRoutes.get("/:categoryId/:id", productController.getProductById);


// productRoutes.use(validateLogin, validateAdmin)
productRoutes.post("/", productController.createProduct);
productRoutes.put("/:id", productController.updateProduct);

/*
productRoutes.get("/", (req, res) => {
    res.send("dame todos los productos");
});
*/

export default productRoutes;