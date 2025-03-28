//escucha el evento submit del formulario de registro
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    //previene que se recargue la pagina
    e.preventDefault();
    //obtenemos los valores del formulario
    let username = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    //hacemos la peticion al servidor
    let response = await fetch("http://localhost:5000/registro", {
      method: "POST",
      //espeficamos que el contenido es de tipo JSON
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    //convertimos los valores a un JSON
    let data = await response.json();
    if (response.ok) {
      //redirimos si el login fue exitoso
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } else {
      alert(data.message);
    }
  });
