import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";
const productRoutes= Router();
const productController= new ProductController();

// Llamados segun el link
productRoutes.get("/", productController.getAllProduct);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", productController.createProduct);
productRoutes.put("/:id", productController.updateProduct);

/*
productRoutes.get("/", (req, res) => {
    res.send("dame todos los productos");
});
*/

export default productRoutes;