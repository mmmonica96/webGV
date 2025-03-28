//seleccionamsos el formulario de login
document
  .getElementById("loginForm")
  //se agrega un evento que escucha cuando se envía el formulario
  .addEventListener("submit", async function (e) {
    //evita que se recargue la pagina
    e.preventDefault();
    //obtenemos los valores de los inputs
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    //realizamos una solicitud al servidor para iniciar sesión
    let response = await fetch("http://localhost:5000/login", {
      method: "POST",
      //los encabezados indican que el contenido que se está enviando
      //al servidor es de tipo JSON
      headers: { "Content-Type": "application/json" },
      //convertimos el objeto a json
      body: JSON.stringify({ email, password }),
    });
    //esperamos la respuesta del servidor
    //sea en formato json
    let data = await response.json();
    //lanzamos la alerta
    alert(data.message);
  });
