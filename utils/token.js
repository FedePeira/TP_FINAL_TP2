import jwt  from "jsonwebtoken";
import { secret } from "../config/config.js";


// Genera / hashea el payload a traves del secret y le pone una expiracion
export const generarToken=()=>{
    const token = jwt.sign({payload}, secret, {
        expiresIn: "2d"
    })
    return token
}

export const verificarToken=(token)=>{

    return jwt.verify(token, secret)
}