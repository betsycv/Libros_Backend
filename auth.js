require('dotenv').config()  //cargar variables de entorno
const jwt = require ("jsonwebtoken") //biblioteca para los token

const SECRET = process.env.SECRET_KEY  


// Función para generar un token de acceso
const generateAccessToken = (user) => {
    return jwt.sign(user, SECRET, {expiresIn: "600s"}  )
}

// Middleware para verificar el token en las solicitudes y autorizar o mandar mensaje de error. esto tambien decide si pasa al siguiente middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]
    if(token === null) return res.sendStatus(401)
        jwt.verify(token, SECRET, (err, user)=> {
            if(err) return res.sendStatus(403)
            req.user = user
            next()
    })
}

// Middleware para autorizar el acceso solo a administradores
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role == "admin"){
        next()
    }  else {
        res.sendStatus(401)
    }

}

//exportar las funciones
module.exports = {generateAccessToken, authenticateToken, authorizeAdmin}