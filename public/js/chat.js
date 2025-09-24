import { connect, sendMessage, sendMessageChanel } from "./web/chatSocket.js";
import { clearUser, redirectToLogin } from "./ui/chatUI.js";

// Verificar usuario
const user = JSON.parse(localStorage.getItem("user"));
if (!user) redirectToLogin();

// DOM
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const channelSala = document.getElementById("salaDiv")
const channelBugs = document.getElementById("bugsDiv")
const channelDev = document.getElementById("desarrolloDiv")

let typeMessage = "sala"
//const channelsForm = document.getElementById("channels")
// const logoutBtn = document.getElementById("logoutBtn");

// Conectar al WebSocket
connect(user);

window.onload = () =>{
    document.querySelector(".user").innerHTML =`
     <img style="width: 50px; height: 50px;" src="https://cdn-icons-png.flaticon.com/512/1361/1361728.png"
                    alt="">
                <p style="display: flex; flex-direction: column; margin-left: -4px; font-size: 14px; padding:4px;">${user.name} <span
                        style="margin-left: 8px; color: #9CA3AF; font-size:11px;">@${user.nickname}</span></p>
                <button>cofig</button>
    `
}

console.log({usuario: user})

// Eventos
chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (text) {
        sendMessage(user, text , typeMessage);
        messageInput.value = "";
    }
});





channelSala.addEventListener("click", () => {
    document.querySelector(".active > button").removeAttribute("disabled", "")

    document.querySelector(".active").classList.remove("active")

    document.querySelector("#salaDiv > button").setAttribute("disabled", "")

    channelSala.classList.add("active")

    typeMessage = "sala"

    console.log("hola sala")
    
    sendMessageChanel(typeMessage)
})

channelBugs.addEventListener("click", () => {

    document.querySelector(".active > button").removeAttribute("disabled", "")

    document.querySelector(".active").classList.remove("active")

    channelBugs.classList.add("active")

    document.querySelector("#bugsDiv > button").setAttribute("disabled", "")

    typeMessage = "bugs"

    console.log("hola bugs")
      sendMessageChanel(typeMessage)
})
channelDev.addEventListener("click", () => {


    document.querySelector(".active > button").removeAttribute("disabled", "")

    document.querySelector(".active").classList.remove("active")
    
    channelDev.classList.add("active")
    
    document.querySelector("#desarrolloDiv > button").setAttribute("disabled", "")
    
    typeMessage = "desarrollo"
    
    console.log("hola dev")
    console.log(typeMessage)
      sendMessageChanel(typeMessage)
})



// logoutBtn.addEventListener("click", function() {
//     clearUser();
//     redirectToLogin();
// });
