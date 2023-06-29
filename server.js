// ACA SE LEVANTA EL SERVIDOR
// Marco de aplicaion web de nodejs que proporciona funciones. 
// Ayuda administrar servidores y rutas
import express from "express";
import connection from "./connection/connection.js"

const app = express();
// Las {} sirven para importar, en este caso de config.js, miembros especificos de un modulo en lugar de importar el modulo entero
import { serverPort } from "./config/config.js"; 
import routes from "./routes/routes.js";
import categorySpeed from "./seed/categorySeed.js"
import cookieParser from "cookie-parser";
import cors from 'cors'

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// momentaneamente(Si no la tenemos que utilizar no es necesario importarlas aca)
// import User from "./Models/User.js";
// import Product from "./Models/Product.js";
// import Category from "./Models/Category.js";
app.use((error, req, res, next) => {
    res
    .status(error.status || 500)
    .send({success: false, message: error.message});
})

/*
Se utilizaría para sincronizar los modelos definidos en tu aplicación con la base de datos, 
asegurando que las tablas y las relaciones estén actualizadas. La opción "force" con valor "false" 
indica que no se realizarán cambios destructivos en la base de datos, como eliminar tablas o columnas 
existentes.
*/ 

await connection
    .sync({ force: false })
    .then(() => {
        app.listen(serverPort,() => {
            console.log(`SERVER OK http://localhost:${serverPort}`);
        });
    })
    .then(() => categorySpeed());

