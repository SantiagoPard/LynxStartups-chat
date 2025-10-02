// chatMovi.js (reemplaza todo)
import { sendMessage, sendMessageChanel } from "./web/chatSocket.js";
import { showConfigModal, showEditModalMobile } from "./ui/chatUI.js";

const user = JSON.parse(localStorage.getItem("user"));




document.addEventListener("DOMContentLoaded", () => {


  function showPanel(panelId) {
    // ahora incluye panelTU
    const panels = ["panelChannels", "panelChat", "panelUsers", "panelTU", "panelEditar"];
    panels.forEach((id) => {

      const el = document.getElementById(id);
      if (!el) return;
      if (id === panelId) el.classList.remove("hidden");
      else el.classList.add("hidden");

      if (panelId === "panelTU") {
        showConfigModal(user)
      }
      if (panelId === "panelEditar") {
        showEditModalMobile(user)
      }
    });
  }

  // funciones accesibles desde HTML
  window.goCanales = () => showPanel("panelChannels");
  window.gotoTu = () => showPanel("panelTU");
  window.gotoEditarP = () => showPanel("panelEditar");
  window.goConectados = () => showPanel("panelUsers");

  const mobileRoot = document.querySelector(".containerMovil");
  if (!mobileRoot) return;

  const channelsMobile = mobileRoot.querySelectorAll("#chanelsMobile .chanel");
  const roomTitleMobile = document.getElementById("roomTitleMobile");
  // IDs móviles
  const messageInputMobile = document.getElementById("messageInputMobile") || document.getElementById("messageInput");
  const chatFormMobile = document.getElementById("chatFormMobile") || document.getElementById("chatForm");
  const messagesMobileInner = document.getElementById("messagesMobileInner");



  // back buttons
  const btnBackFromChat = document.getElementById("btnBackFromChat");
  if (btnBackFromChat) btnBackFromChat.addEventListener("click", () => showPanel("panelChannels"));

  const btnBackFromUsers = document.getElementById("btnBackFromUsers");
  if (btnBackFromUsers) btnBackFromUsers.addEventListener("click", () => showPanel("panelChannels"));

  const btnShowUsersMobile = document.getElementById("btnShowUsersMobile");
  if (btnShowUsersMobile) btnShowUsersMobile.addEventListener("click", () => showPanel("panelUsers"));

  let mobileType = (JSON.parse(localStorage.getItem("user")) || {}).chanel || "sala";

  function setActiveChannelVisual(type) {
    channelsMobile.forEach((ch) => {
      if (ch.dataset.channel === type) ch.classList.add("active");
      else ch.classList.remove("active");
    });
    if (roomTitleMobile) {
      const map = { sala: "#🏠 | Sala", bugs: "#🪲 | Bugs", desarrollo: "#💻 | Desarrollo" };
      roomTitleMobile.innerText = map[type] || type;
    }
  }

  channelsMobile.forEach((ch) => {
    ch.addEventListener("click", () => {
      const type = ch.dataset.channel;
      if (!type) return;
      mobileType = type;
      setActiveChannelVisual(type);

      const userObj = JSON.parse(localStorage.getItem("user")) || {};
      userObj.chanel = type;
      localStorage.setItem("user", JSON.stringify(userObj));

      setTimeout(() => {
        sendMessageChanel(user, mobileType);
      }, "400");

      changeChanel(mobileType);




      try { sendMessageChanel(userObj, type); } catch (e) { console.warn("sendMessageChanel error", e); }

      showPanel("panelChat");
      if (messagesMobileInner) messagesMobileInner.innerHTML = "";
    });
  });






  function changeChanel(mobileType) {
    let chanel = document.getElementById(`${mobileType}Div`);

    document.querySelector(".active > button").removeAttribute("disabled", "");

    document.querySelector(".active").classList.remove("active");

    document
      .querySelector(`#${mobileType}Div > button`)
      .setAttribute("disabled", "");

    chanel.classList.add("active");
  }



  setActiveChannelVisual(mobileType);
  showPanel("panelChat");
});

