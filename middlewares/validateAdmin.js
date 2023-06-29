import {User} from "../Models/index.js";

export const  validateAdmin = async (req, res, next) => {
    try {
        
        const {user} = req
        const user_check = await User.findByPk(user.id)
        

        if (user_check.role != "admin"){
            const error =  new Error("El usuario no es administrador.")
            error.status = 400
            throw error
        }
        next()
    } catch (error) {
        next(error)
    }
    
}