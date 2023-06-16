import "dotenv/config";
// Es como CONSTANTES de env
const serverPort = process.env.SERVER_PORT;
const database = process.env.DATABASE;
// console.log(database)
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

export { serverPort, database, username, password, dialect, host, port };