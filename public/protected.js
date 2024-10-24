(()=>{ //Immediately Invoked Function Expression
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem("userType")
    const userData = localStorage.getItem("user")

//verifica si hay token 
    if (!token) {
        window.location.href ="/login.html"
    }

    


})()

