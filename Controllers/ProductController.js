import { Product, Category } from "../Models/index.js";

// Controlador de Product
// Get, GetId, Create, Put  

class ProductController {
    constructor() {};

    getAllProduct= async(req, res) =>{
        try{
            const result = await Product.findAll({
                attributes: ["id", "name", "description", "categoryId"],
                include:[
                    {
                        model: Category,
                        attributes: ["name"]
                    }
                ]
            });
            if(result.length===0) throw new Error("No hay productos");
            res.status(200).send({
                result,
            });
        } catch(error){
            res.status(400).send({
                success: false,
                message: error.message,
            });
        };
        // res.send("Bienvenido a todos los productos");
    };

    getProductById=async(req, res) => {
        try {
            const {id} = req.params;
            const result = await Product.findAll({
                attributes: ["id", "name", "description", "categoryId"],
                where: {
                    id
                }
            });
            if(result.length===0) throw new Error("No hay producto");
            // console.log("result:", result[0].dataValues);
            res.status(200).send({
                success: true,
                message: "Este es el producto",
                result: result[0].dataValues,
            });
        } catch(error) {
            res.status(200).send({
                success: false,
                message: error.message,
            });
        }
    };

    createProduct = async(req, res) => {
        try {
            const { name, description, categoryId } = req.body;
            const result = await Product.create({ name, description, categoryId });
            console.log("result", result);
            if(!result) throw new Error ("No se pudo crear el producto");
            res.status(200).send({
                success: true,
                message: "Se creo producto exitosamente",
            });
        } catch(error) {
            res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    };

    updateProduct = async (req, res) => {
        try {
            console.log("Bienvenido a Update");
            const { id } = req.params;
            console.log(id);
            const { name, description } = req.body;
            console.log(req.body);
            const result = await Product.update(
                { name, description },
                {
                    where: {
                        id,
                    },
                }
            );
            console.log("Result:", result);
            if(result[0]===0) throw new Error("No se pudo modificar el producto");
            // if(!result) throw new Error ("No se pudo crear el producto")
            res.status(200).send({
                success: true,
                message: "Producto modificado exitosamente",
            });
        } catch(error) {
            res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    };
    getProductByCategory = async (req, res, next) => {
        try {
            const {categoryId} = req.params
            const result = await Product.findAll({
                attributes: ["id", "name", "description", "categoryId"],
                where: {
                    categoryId
                }
            })
            if(result.length===0) throw new Error("No hay producto");
            
            res.status(200).send({
                success: true,
                message: "Estos son los productos",
                result
            });

            
        } catch (error) {
            next(error)
        }
    }
};

export default ProductController;