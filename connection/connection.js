//
/*
Para evitar  el problema completamente y tomar cómo práctica nunca incluir API keys o secrets 
en nuestros repositorios. Para esto podemos utilizar variables de ambiente o entorno. Que es basicamente
esto que estamos haciendo en el codigo
*/

import "dotenv/config"
// Framework Sequelize agiliza los desarrollos que incluyan bases de datos relacionales como MySQL
import { Sequelize } from "sequelize";
import {
    database,
    username,
    password,
    host,
    dialect,
    port,
} from "../config/config.js";
/*
Esto, como en .env, sirve guardar todas aquellas variables que no queremos que 
otros accedan y consumirlas directamente desde el objeto process.env
*/
const connection = new Sequelize(database, username, password,{
    host,
    dialect,
    port,
});
try{
    await connection.authenticate();
    console.log("db connection OK");
} catch(e){
    console.log(e);
}

export default connection