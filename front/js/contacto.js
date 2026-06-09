const formulario = document.getElementById("formContacto");
const alerta = document.getElementById("alerta");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (nombre === "" || email === "" || mensaje === "") {
    alerta.textContent =
      "Por favor, completá todos los campos (Nombre, Email y Mensaje).";
    alerta.className = "alert alert-danger";
    return;
  }

  alerta.textContent = "¡Mensaje enviado con éxito!";
  alerta.className = "alert alert-success";

  formulario.reset();
});
