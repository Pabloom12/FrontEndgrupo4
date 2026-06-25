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
      document.getElementById("descripcion-articulo").innerHTML =
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

// Ejecutar cuando la página cargue

async function cargarClima() {
  const clima = document.querySelector("#clima");
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast" +
        "?latitude=-34.9&longitude=-56.17&current_weather=true",
    );
    if (!response.ok) throw new Error("Error al obtener el clima");
    const datos = await response.json();
    const temp = datos.current_weather.temperature;
    const viento = datos.current_weather.windspeed;
    clima.innerHTML = `
<p class="mb-0">
️ Montevideo — <strong>${temp}°C</strong>
&nbsp;|&nbsp;
💨 Viento: ${viento} km/h
</p>
`;
  } catch (error) {
    clima.innerHTML = `<p class="text-muted mb-0">Clima no
disponible.</p>`;
    console.error(error);
  }
}
cargarClima();
function emojiClima(code) {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "☁️";
  if (code <= 67) return "️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "️";
  return "⚡";
}
async function cargarClima() {
  const clima = document.querySelector("#clima");
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast" +
        "?latitude=-34.9&longitude=-56.17&current_weather=true",
    );
    if (!response.ok) throw new Error("Error al obtener el clima");
    const datos = await response.json();
    const temp = datos.current_weather.temperature;
    const viento = datos.current_weather.windspeed;
    const emoji = emojiClima(datos.current_weather.weathercode);
    clima.innerHTML = `
<p class="mb-0">
${emoji} Montevideo — <strong>${temp}°C</strong>
&nbsp;|&nbsp;
💨 Viento: ${viento} km/h
</p>
`;
  } catch (error) {
    clima.innerHTML = `<p class="text-muted mb-0">Clima no
disponible.</p>`;
    console.error(error);
  }
}
