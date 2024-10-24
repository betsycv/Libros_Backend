require("dotenv").config() //variables de entorno

// Importar las rutas de la API y las de frontend
const apiRoutes =require ("./api-routes")
const frontRoutes = require("./front-routes")
const express = require ('express')

const app = express()
const PORT = process.env.PORT // Obtiene el puerto desde las variables de entorno

// Middleware
app.use(express.json()) 

app.use(express.static('public'))


// Define las rutas para la API, que comienzan con /api
app.use('/api', apiRoutes) 

// Define las rutas para el frontend
app.use("/", frontRoutes)

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, ()=> console.log(`server is running on port: ${PORT}`))

// Exporta la aplicación
module.exports = app