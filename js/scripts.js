/*!
* Start Bootstrap - Small Business v5.0.6 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// Toggle modo oscuro con localStorage
const toggle = document.getElementById("container");

// 1. Al cargar la página, revisamos si ya había una preferencia guardada
const modoGuardado = localStorage.getItem("modo");

if (modoGuardado === "oscuro") {
  document.body.classList.add("active");
  toggle.classList.add("active");
}

// 2. Al hacer click, cambiamos el modo y lo guardamos en localStorage
toggle.addEventListener("click", function () {
  document.body.classList.toggle("active");
  toggle.classList.toggle("active");

  if (document.body.classList.contains("active")) {
    localStorage.setItem("modo", "oscuro");
  } else {
    localStorage.setItem("modo", "claro");
  }
});