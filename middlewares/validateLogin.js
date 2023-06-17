import { verificarToken } from "../utils/token.js";

const validateLogin = (req,res,next)=>{
   try {
    const {token} = req.cookies
    if (!token) throw new Error("Requiere login")
        
    const {payload} = verificarToken(token)
    if (!payload) throw new Error("Requiere login")
    
    req.user=payload

    next()

   } catch (error) {

    next(error)
    
   }
    
}

export default validateLogin