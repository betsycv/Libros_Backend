(()=>{ //Immediately Invoked Function Expression
    const token = localStorage.getItem('token')  //obtener token
    const userType = localStorage.getItem("userType")  //obtener tipo de usuario
    const userData = localStorage.getItem("user") //datos del usuario

    //obtener los elementos para mostrar
    const membershipElement = document.getElementById("membership-level")
    const usernameelement = document.getElementById("username")
    const productsElement = document.getElementById("productos")

    //esto verifica que hay un token de acceso
    if (token){
        const userName = JSON.parse(userData).username
        usernameelement.textContent = userName
        membershipElement.textContent = userType

// Realiza un GET para obtener productos
        fetch("/api/productos", {
            method: "GET",
            headers: {
                'Authorization' : token  //coloca el token del acceso
            }
    })
    .then((response)=>response.json())  //convierte la respuesta a JSON
    .then((result)=>{
        let cardStr = ""
        const productos2 = result.data  //Obtiene los productos

//genera las tarjetas html para cada producto de la base de datos
        productos2.forEach(element=>{
            cardStr += `<div class="product-card">
            <img src="imagenes/${element.imagen}" alt="${element.nombre}" class="product-image">
            <h3 class="product-title">${element.nombre}</h3>
            <p class="product-description">${element.descripcion}</p>
            <p class="product-price">$ ${element.precio}</p>
            <div class="autor-container">
                <label for="autor">Autor:${element.autor}</label>
            </div>
            <button class="delete-button">Eliminar</button>
        </div>
        `
        });

        productsElement.innerHTML = cardStr  //inserta las cards 

       

    })
    .catch((err)=>{  //mensaje de error
        console.error(err)
    })
    }

    //botón de cerrar sesión para que al hacer click se eliminan los datos de token y usuario 
    const logoutBtn = document.querySelector("#logout-buttom")
    logoutBtn.addEventListener("click", ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("userType")
        window.location.href= "/login.html"
    })

})()