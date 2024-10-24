(()=>{ //Immediately Invoked Function Expression
    const form = document.querySelector("#login-form") //formulario de inicio se sesión
    const errorMessage = document.getElementById("error-message")  //mensaje de error

    form.addEventListener("submit", async(event)=>{
        event.preventDefault()
//obtener los valores del formulario
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        
        try{ // Envía una solicitud POST para iniciar sesión
            const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({username, password}), // Convierte los datos a formato JSON
                headers: {
                    'Content-Type' : "application/json" 
                }
            })

//verificar que la respuesta fue buena
            if (!response.ok) {
                const errorData = await response.json()
                errorMessage.textContent= "Login falló" //mostrar mensaje de error
                throw new Error(errorData.message || "Login falló")
            }

            const data =  await response.json()

            const {token, user} = data  //obtener el token y  usuario

            const userType = user.role //obtener el tipo de usuario

// Guardar el token y los datos del usuario
            localStorage.setItem('token', token)
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("userType", userType)

//mandar al usuario a la página que le toca segun su rol
            if(userType === "admin") {
                window.location.href = "/admin.html"

            }else if (userType === "editor"){
                window.location.href = "editor.html"
            }else if (userType === "user"){
                window.location.href = "/user.html"
            }else {
                window.location.href="/"
            }
        }catch(err){
            errorMessage.textContent = err.message //muestra mensaje de error
        }


    })
})()