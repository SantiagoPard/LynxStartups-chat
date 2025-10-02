import { connect, sendMessage, sendMessageChanel, updateUsers } from "./web/chatSocket.js";
import { clearUser, onInit, redirectToLogin, showConfigModal , changeChanel, changeChanelMobile, keepSameInputValues } from "./ui/chatUI.js";

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
const channelSalaMovil = document.getElementById("salaDiv-mobile");
const channelBugsMovil = document.getElementById("bugsDiv-mobile");
const channelDevMovil = document.getElementById("desarrolloDiv-mobile");

let typeMessage = "sala";

// Conectar al WebSocket
connect(user);

//chat ui
window.onload = () => {
  setTimeout(() => {
    sendMessageChanel(user, "sala");
  }, "600");
  changeChanelMobile(typeMessage)
  onInit(user)
  
};

// Eventos
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    setTimeout(() => {
      sendMessageChanel(user, typeMessage);
    }, "600");
    updateUsers()
  } else {
    updateUsers()
  }

})


keepSameInputValues()

channelSalaMovil.addEventListener("click", () => {
  typeMessage = "sala"
  console.log("hola")
});
channelBugsMovil.addEventListener("click", () => {
  typeMessage = "bugs"
  console.log("como")
});
channelDevMovil.addEventListener("click", () => {
  typeMessage = "desarrollo"
  console.log("estas")
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

  changeChanelMobile(typeMessage)

  sendMessageChanel(user, typeMessage);

});

channelBugs.addEventListener("click", () => {
  typeMessage = "bugs";
  changeChanel(typeMessage);

  user["chanel"] = typeMessage;

  localStorage.setItem("user", JSON.stringify(user));

  changeChanelMobile(typeMessage)

  sendMessageChanel(user, typeMessage);

});

channelDev.addEventListener("click", () => {
  typeMessage = "desarrollo";

  changeChanel(typeMessage);

  user["chanel"] = typeMessage;

  localStorage.setItem("user", JSON.stringify(user));

  changeChanelMobile(typeMessage)

  sendMessageChanel(user, typeMessage);
});


