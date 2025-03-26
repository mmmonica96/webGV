document.addEventListener("DOMContentLoaded", function () {
  //selecionamos todos los botones del html
  const botonesComprar = document.querySelectorAll(".btn-comprar");
  //hacemos un evento en el que
  //cuando clique coge todo lo que se ha selecionado del html
  //y la ruta de la imagen
  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", function () {
      //encuentra el producto correspondiente
      const producto = boton.parentElement;
      const nombre = producto.querySelector(".nombre").textContent;
      const precio = producto.querySelector(".precio").textContent;
      const imagen = producto.querySelector("img").src;

      //creamos el objeto del producto
      const productoObj = {
        nombre,
        precio,
        imagen,
      };

      //obtener carrito de localStorage o crear uno vacío
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      //agregamos el nuevo producto al array
      carrito.push(productoObj);

      //guardamos en el localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
      //avisamos que se ha metido un producto en el carrito
      alert(`"${nombre}" se ha añadido al carrito.`);
    });
  });
});
