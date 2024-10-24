(()=>{ //Immediately Invoked Function Expression
    const form = document.getElementById("signupform")  //formulario de registro
    const errorMessage = document.getElementById("error-message") //mensaje de error

    form.addEventListener("submit", async (event)=>{
        event.preventDefault()

// Obtiene los valores de usuario, contraseña y rol que se pusieron en el registro
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const role = document.getElementById("role").value

        if (!username || !password || !role){
            errorMessage.textContent= "Por favor llena todos los campos"
            return
        }
 // Envía los datos al servidor usando fetch
        try{
            const response = await fetch("/api/signup", {
                method: "POST",
                body: JSON.stringify({username, password, role}),   // Convierte los datos a formato JSON
                headers: {
                    'Content-Type' : "application/json"
                }
            })
            if (!response.ok) {
                const errorData = await response.json()
                errorMessage.textContent= "Signup falló"
                throw new Error(errorData.message || "Signup falló")
            }

            const data =  await response.json()  // Convierte la respuesta a JSON

            const {token, user} = data

            const userType = user.role

// Guarda el token y el usuario
            localStorage.setItem('token', token)
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("userType", userType)

// Redirige al usuario según su rol
            if(userType === "admin") {
                window.location.href = "/admin.html"

            }else if (userType === "editor"){
                window.location.href = "editor.html"
            }else if (userType === "user"){
                window.location.href = "/user.html"
            }else {
                window.location.href="/"
            }

        } catch (err) {
            errorMessage.textContent= err.message  // Muestra el mensaje de error en caso de fallo
        }
    })

})()