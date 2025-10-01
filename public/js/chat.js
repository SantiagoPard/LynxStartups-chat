import { connect, sendMessage, sendMessageChanel } from "./web/chatSocket.js";
import { clearUser, redirectToLogin, showConfigModal } from "./ui/chatUI.js";

// Verificar usuario
const user = JSON.parse(localStorage.getItem("user"));
// const messagesDiv = document.getElementById("messages");
if (!user) redirectToLogin();

// DOM
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatFormMovil = document.getElementById("chatFormMovil");
const messageInputMovil = document.getElementById("messageInputMovil");
const channelSala = document.getElementById("salaDiv");
const channelBugs = document.getElementById("bugsDiv");
const channelDev = document.getElementById("desarrolloDiv");


let typeMessage = "sala";

// Conectar al WebSocket
connect(user);

//chat ui
window.onload = () => {
  
  setTimeout(() => {
    sendMessageChanel(user, "sala");
  }, "400");

  document.querySelector("#user").innerHTML = `
  <img class="imgUser" src="https://cdn-icons-png.flaticon.com/512/1361/1361728.png" alt="">
  <p class="contentUser">${user.name} <span class="nickName">@${user.nickname}</span></p>
  <button id="configBtn" ><i class="material-symbols-outlined">settings_account_box</i></button>
  `;

  const configBtn = document.getElementById("configBtn");
  configBtn.addEventListener("click", () => {
    showConfigModal(user);
  });
};

// Eventos
window.addEventListener('resize', () => {
  if(window.innerWidth> 768){
      setTimeout(() => {
      sendMessageChanel(user, typeMessage);
    }, "400");
  }

})



chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = messageInput.value.trim();

  if (text) {
    sendMessage(user, text, typeMessage);
    messageInput.value = "";

  }
});

chatFormMovil.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = messageInputMovil.value.trim();

  if (text) {
    sendMessage(user, text, typeMessage);
    messageInputMovil.value = "";
  }
});



channelSala.addEventListener("click", () => {
  typeMessage = "sala";

  changeChanel(typeMessage);

  user["chanel"] = typeMessage;

  localStorage.setItem("user", JSON.stringify(user));

  sendMessageChanel(user, typeMessage);
});

channelBugs.addEventListener("click", () => {
  typeMessage = "bugs";
  changeChanel(typeMessage);

  user["chanel"] = typeMessage;

  localStorage.setItem("user", JSON.stringify(user));

  sendMessageChanel(user, typeMessage);
});
channelDev.addEventListener("click", () => {
  typeMessage = "desarrollo";

  changeChanel(typeMessage);

  user["chanel"] = typeMessage;

  localStorage.setItem("user", JSON.stringify(user));

  sendMessageChanel(user, typeMessage);
});

function changeChanel(typeMessage) {
  let chanel = document.getElementById(`${typeMessage}Div`);

  document.querySelector(".active > button").removeAttribute("disabled", "");

  document.querySelector(".active").classList.remove("active");

  document
    .querySelector(`#${typeMessage}Div > button`)
    .setAttribute("disabled", "");

  chanel.classList.add("active");
}


