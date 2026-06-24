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

      // 4. NUEVO: Lógica para cargar la imagen
      const imgElement = document.getElementById("imagen-articulo");

      // Verificamos si el backend envió el campo 'imagen'
      if (articulo.imagen) {
        // Armamos la ruta hacia la carpeta public del servidor
        imgElement.src = `http://localhost:3000/${articulo.imagen}`;
        imgElement.style.display = "block"; // Hacemos visible la imagen
      } else {
        // Si el artículo no tiene imagen (ej: Torta Frita), la mantenemos oculta
        imgElement.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("titulo-articulo").textContent =
        "Error de conexión con el servidor.";
    });
});
