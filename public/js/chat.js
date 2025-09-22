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
