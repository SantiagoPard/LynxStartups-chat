import { connect, sendMessage } from "./web/chatSocket.js";
import { clearUser, redirectToLogin } from "./ui/chatUI.js";

// Verificar usuario
const user = JSON.parse(localStorage.getItem("user"));
if (!user) redirectToLogin();

// DOM
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
// const logoutBtn = document.getElementById("logoutBtn");

// Conectar al WebSocket
connect(user);

// Eventos
chatForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (text) {
        sendMessage(user, text);
        messageInput.value = "";
    }
});

// logoutBtn.addEventListener("click", function() {
//     clearUser();
//     redirectToLogin();
// });


// modla 



const modal = document.getElementById("configModal");
const configBtn = document.querySelector(".user button");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.getElementById("cancelBtn");

// seguridad por si no existe el botón
if (!configBtn) {
  console.error("No se encontró el botón .user button");
} else {
  // mover modal al body para evitar recortes por contenedores parents
  if (modal && modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  // función que abre y posiciona el popover
  function openPopover() {
    if (!modal || !configBtn) return;

    // mostrar temporalmente para medir
    modal.style.display = "block";
    modal.style.visibility = "hidden"; // no visible mientras medimos

    // forzamos tipo fixed (en CSS ya está) y z-index alto
    modal.style.position = "fixed";
    modal.style.zIndex = 3000;

    // medir
    const btnRect = configBtn.getBoundingClientRect();
    const modalRect = modal.getBoundingClientRect();

    // offset para separarlo del botón (ajusta si quieres más arriba)
    const offsetYUp = 12; // px entre botón y popover cuando aparece arriba
    const offsetYDown = 10; // px cuando aparece debajo

    // posicionamiento: intentamos arriba (preferido)
    let top = btnRect.top - modalRect.height - offsetYUp;
    let left = btnRect.left + (btnRect.width / 2) - (modalRect.width / 2);

    // si no cabe arriba (muy cerca del tope), lo ponemos abajo
    const fitsAbove = top >= 8;
    if (fitsAbove) {
      modal.classList.remove("arrow-bottom");
      modal.classList.add("arrow-top"); // flecha abajo del recuadro
    } else {
      // poner debajo
      top = btnRect.bottom + offsetYDown;
      modal.classList.remove("arrow-top");
      modal.classList.add("arrow-bottom"); // flecha arriba del recuadro
    }

    // evitar que se salga por la izquierda/derecha del viewport
    const minLeft = 8;
    const maxLeft = window.innerWidth - modalRect.width - 8;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    // aplicar y hacer visible
    modal.style.top = Math.round(top) + "px";
    modal.style.left = Math.round(left) + "px";
    modal.style.visibility = "visible";
  }

  // toggle open/close
  configBtn.addEventListener("click", (ev) => {
    // si ya está visible, cerramos
    if (modal.style.display === "block" && modal.style.visibility === "visible") {
      modal.style.display = "none";
      return;
    }
    openPopover();
    ev.stopPropagation(); // evitar que el window click lo cierre inmediatamente
  });

  // cerrar por X o cancelar
  closeBtn?.addEventListener("click", () => modal.style.display = "none");
  cancelBtn?.addEventListener("click", () => modal.style.display = "none");

  // cerrar al hacer click fuera (no sobre el modal ni el botón)
  window.addEventListener("click", (e) => {
    if (!modal || !configBtn) return;
    if (e.target === configBtn) return;
    if (!modal.contains(e.target)) modal.style.display = "none";
  });

  // reposicionar cuando haya scroll o resize (si está abierto)
  window.addEventListener("resize", () => {
    if (modal.style.display === "block") openPopover();
  });
  window.addEventListener("scroll", () => {
    if (modal.style.display === "block") openPopover();
  });
}
