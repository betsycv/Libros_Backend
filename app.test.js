const express = require("express");
const requ = require("supertest");
const mysql = require("mysql2");
const router = require("./api-routes");

const app = express();
app.use(express.json());
app.use(router);

// Se necesita este codigo para conectarse a la base de datos 
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Pruebas
describe("API Endpoints", () => {
    let token; // Variable para almacenar el token para la segunda prueba

    it("Prueba de inicio de sesion ", async () => {
        const res = await requ(app)
            .post("/login")
            .send({
                username: "betsyc", // mis credenciales
                password: "Betsy123" 
            });

        //  El codigo 200 significa que se conecto correctqmente
        expect(res.statusCode).toBe(200);

        // Se necesita que tenga token para usarlo en la siguiente prueba 
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("message", "login correcto");

        token = res.body.token;
    });

    it("debería retornar productos con un token válido", async () => {
        const res = await requ(app)
            .get("/productos")
            .set("Authorization", token); // pedimos productos y utilizamos el token 

        //200 signidica que si inicio sesion 
        expect(res.statusCode).toBe(200);

        // Esperamos que la respuesta sea data y sea un arreglo 
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data)).toBe(true); 
    });
    
});

// Cierra la conexion despues de todas las pruebas
afterAll((done) => {
    connection.end(done);
});
