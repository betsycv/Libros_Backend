const express= require("express")
const path = require("path")
const router = express.Router()

router.get("/", (req, res)=> {  // Envía el archivo index.html
    res.sendFile(path.join(__dirname, "./public", "index.html"))
})

router.get("/login", (req, res)=>{ // Envía el archivo login.html
    res.sendFile(path.join(__dirname, "./public", "login.html"))
})

router.get("/signup", (req, res)=>{ // Envía el archivo signup.html
    res.sendFile(path.join(__dirname, "./public", "signup.html"))
})

// Exporta el router para que pueda ser utilizado 
module.exports = router