document.addEventListener("DOMContentLoaded", function() { //cargar el documento html 
    const accountButton = document.querySelector(".account-button");
    
    accountButton.addEventListener("click", function() {
        window.location.href = "login.html";  //manda al la página de login cuando se hace click en el botón
    });
});
