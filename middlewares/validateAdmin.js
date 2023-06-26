export const validateAdmin = (req, res, next) => {
    try {
        const {user} = req

        if (user.role != "admin"){
            const error =  new Error("El usuario no es administrador.")
            error.status = 400
            throw error
        }
        next()
    } catch (error) {
        next(error)
    }
    
}