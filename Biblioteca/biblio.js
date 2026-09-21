/**
 * Biblioteca - Procesamiento de solicitudes de préstamo
 *
 * Contexto:
 * En una biblioteca los usuarios hacen solicitudes para préstamos de libros.
 * La función procesarSolicitud recibe un array en el que:
 *  - El primer elemento es el nombre del usuario.
 *  - Los siguientes elementos son los títulos de los libros que quiere.
 *
 * Reglas del sistema:
 * 1. Sacar el nombre del usuario (primer elemento).
 * 2. Añadir al inicio del array la cadena "Carné de socio".
 * 3. Añadir al final del array el nombre del usuario.
 * 4. Devolver el array modificado.
 */
function procesarSolicitud(solicitud) {
  const copia = [...solicitud];

  // 1. Sacar el nombre del usuario (primer elemento)
  const nombreUsuario = copia.shift();

  // 2. Añadir al inicio la cadena "Carné de socio"
  copia.unshift("Carné de socio");

  // 3. Añadir al final el nombre del usuario
  copia.push(nombreUsuario);

  // 4. Devolver el array modificado
  return copia;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("solicitud-form");
  const librosContainer = document.getElementById("libros-container");
  const addLibroBtn = document.getElementById("add-libro");
  const resultadoDiv = document.getElementById("resultado");

  function crearCampoLibro() {
    const grupo = document.createElement("div");
    grupo.className = "libro-input-group";
    grupo.innerHTML = `
      <input type="text" class="ficha-input libro-input" placeholder="Título del libro" />
      <button type="button" class="remove-libro" aria-label="Quitar libro">✕</button>
    `;
    librosContainer.appendChild(grupo);

    grupo.querySelector(".remove-libro").addEventListener("click", () => {
      if (librosContainer.querySelectorAll(".libro-input-group").length > 1) {
        grupo.remove();
      } else {
        grupo.querySelector(".libro-input").value = "";
      }
    });
  }

  addLibroBtn.addEventListener("click", crearCampoLibro);

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombreUsuario = document.getElementById("nombre-usuario").value.trim();
    const libros = Array.from(document.querySelectorAll(".libro-input"))
      .map((input) => input.value.trim())
      .filter((titulo) => titulo !== "");

    if (!nombreUsuario || libros.length === 0) {
      resultadoDiv.innerHTML = `
        <p class="resultado-alerta">Ingresa el nombre del usuario y al menos un título de libro.</p>`;
      return;
    }

    const solicitud = [nombreUsuario, ...libros];
    const resultado = procesarSolicitud(solicitud);

    resultadoDiv.innerHTML = `
      <div class="sello">
        <h2>Array recibido</h2>
        <pre class="resultado-array">${JSON.stringify(solicitud)}</pre>
        <h2>Array devuelto</h2>
        <pre class="resultado-final">${JSON.stringify(resultado)}</pre>
      </div>
    `;
  });

  crearCampoLibro();
});