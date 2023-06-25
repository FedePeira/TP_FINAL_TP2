import { User } from "../Models/index.js";
import  jwt  from "jsonwebtoken";
import { generarToken, verificarToken } from "../utils/token.js";



class UserController {
    constructor() {}

    getAllUsers = async (req, res, next) => {
        try {
            res.status(200).send("ok");
        } catch(error) {
            res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    };

    createUser = async (req, res, next) => {
        try {
            const { name, lastName, password, email } = req.body;
            const result = await User.create({ name, lastName, password, email });
            if(!result){
               const error = new Error("No se pudo crear al usuario");
               error.status = 400;
               throw error;
            } 
            res.status(200).send({
                success: true, 
                message:"Usuario creado con exito",
                result,
            });
        } catch(error) {
            // res.status(400).send({
               // success: false,
               // message: error.message,
            // });
            next(error);
        }
    };

    getUserById = async(req, res) => {
        try {
            const {id} = req.params;
            const result = await User.findAll({
                attributes: ["id", "name", "lastName", "password" , "email"],
                where: {
                    id
                }
            });
            if(result.length===0) throw new Error("No hay usuario");
            // console.log("result:", result[0].dataValues);
            res.status(200).send({
                success: true,
                message: "Este es el usuario",
                result: result[0].dataValues,
            });
        } catch(error) {
            res.status(200).send({
                success: false,
                message: error.message,
            });
        }
    };

    updateProduct = async (req, res) => {
        try {
            console.log("Bienvenido a Update");
            const { id } = req.params;
            const { name, lastName, password ,email } = req.body;
            const result = await User.update(
                { name, lastName, password ,email },
                {
                    where: {
                        id,
                    },
                }
            );
            console.log("Result:", result);
            if(result[0]===0) throw new Error("No se pudo modificar el usuario");
            // if(!result) throw new Error ("No se pudo crear el producto")
            res.status(200).send({
                success: true,
                message: "Usuario modificado exitosamente",
            });
        } catch(error) {
            res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    };
    deleteUser = async (req, res) => {
        try {
          const userId = req.params.id;
          await User.findByIdAndDelete(userId);
      
          // Enviar una respuesta exitosa
          res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
          // Manejar cualquier error que ocurra durante el proceso
          res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    };

    // Metodo Login
    login = async (req, res)=> {
        try {
            const { email, password: passwordTextoPlano } = req.body;
            
            const result = await User.findOne({
                where: {
                    email,
                },
            });
            
            const comparePassword = result.validatePassword(passwordTextoPlano)
            
            if(!comparePassword){
                const error = new Error("Credenciales erroneas");
                error.status = 400; 
                throw error;
            }
            
            const payload = {
                id: result.id,
                email:result.email
            }
            
            const token = generarToken(payload)
            
            //Una vez generado el token se guarda en una cookie
            res.cookie("token", token)
            // if(!result) throw new Error ("No se pudo crear el producto")
            res.status(200).send({
                success: true,
                message: "Usuario logueado",
            });
            
        } catch(e){
            next(e);
        }
    };
    //Es para traerse el usuario que esta dentro de la cookie por si refresco la pagina
    
    me=(req,res,next)=>{
        const {user} = req


        res.status(200).send({
            success: true,
            message: "Usuario ok",
            result: user
        });

    };

    logout=(req,res,next)=>{
        res.cookie("token", "")
        
        res.status(200).send({
            success: true,
            message: "Usuario deslogueado",
           
        })
    }

}

export default UserController;