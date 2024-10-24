require('dotenv').config()  //variables de entorno

//importar dependencias
const express = require ("express")
const mysql = require ("mysql2")
const bcrypt = require ("bcrypt")
const {generateAccessToken, authenticateToken, authorizeAdmin} = require ("./auth")
const router = express.Router()
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env

//hacer la conección a la base de datos de mysql
const connection = mysql.createConnection({
    host:DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database:DB_NAME
})

//POST para el inicio de sesión y obtener los datos
router.post("/login", async (req, res)=>{
    const {username, password} = await req.body
    const user = {username}

    //verificar en la base de datos si existe el usuario
    connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, results)=>{
            if(err) return res.status(500).json({message: 'Database error'})
                console.log(results)
            if(results.length === 0){
                console.error("user incorrecto")
                return res.status(400).json({message: "Invalid username or password"})  //mensaje de error
            }
            const userDB = results[0]
            bcrypt.compare(password, userDB.password, (err, isMatch)=>{  //comparar los datos con los que hay en la base de datos
                if(err) throw err

                if(isMatch){  //si la contraseña y usuario son correctos se accede sino mensaje de error
                    const userData = {role:userDB.role, username}
                    const token = generateAccessToken(userData)
                    res.json({message:"login correcto", token, user:userData})
                } else {
                    console.error("password incorrecto")
                    res.status(400).json({message: "Invalid username or password"})
                }
            })
        }
    )
})

//registro de nuevos usuarios
router.post("/signup", async (req, res)=>{
    const {username, password, role} =  await req.body  //obtener el nombre, contraseña y rol
    const user  = {username, role}

//encripta la contraseña antes de almacenarla
    bcrypt.hash(password, 10, (err, hash)=>{
        if(err) throw err;
        connection.query(
            'INSERT INTO users (username, password, role) VALUES (?,?,?)', 
            [username, hash, role],
            (err, result)=>{
                if(err) {
    
                    if(err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({message:"User already exist"}) //mensaje de error si el usario ya existe en la base de datos
                    }s
                   
                    return res.status(500).json({message: "Database error"})
                }
    
                const token = generateAccessToken(user)
                res.status(201).json({message:"user was created", token, user})  //generar el token de acceso
            }
        )
    })
    
})
    

//GET para que la ruta este protegida y poderlos redirigir segun su tipo de usuario
router.get("/protected", authenticateToken, (req, res)=>{
    res.json({data:"lista de ventas", user: req.user})
})

//ruta del admin
router.get("/admin", authenticateToken, authorizeAdmin, (req, res)=>{
    res.json({data: "lista de ventas y articulos para admin", user:req.user})
})

//obtener los productos
router.get("/productos", authenticateToken, async (req, res)=>{
    try {
        connection.query("SELECT * FROM productos", (err, result)=>{
            if(err){
                return res.status(500).json({message: 'Database error'})
            }
            if (result.length === 0) {
                return res.status(404).json({message:"productos no encontrados"})
            }
            res.json({data:result})  // Responde con los productos encontrados
        })
    } catch(err){

    }
})

// Exporta el router para usarlo en otras partes de la aplicación
module.exports = router