document.addEventListener("DOMContentLoaded", () => {
  // 1. Leer el ID de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("titulo-articulo").textContent =
      "Artículo no encontrado.";
    return;
  }

  // 2. Hacer el fetch usando el ID
  fetch(`http://localhost:3000/articulos/${id}`)
    .then((respuesta) => respuesta.json())
    .then((articulo) => {
      // 3. Mostrar el contenido en el HTML
      document.getElementById("titulo-articulo").textContent = articulo.titulo;
      document.getElementById("autor-articulo").textContent = articulo.autor;
      document.getElementById("descripcion-articulo").textContent =
        articulo.descripcion;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("titulo-articulo").textContent =
        "Error de conexión con el servidor.";
    });
});
