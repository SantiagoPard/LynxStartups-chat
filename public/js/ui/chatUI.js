const messagesDiv = document.getElementById("messages");
const messagesDivMovil = document.getElementById("messagesMovil");
// chat-main
const chatMainDiv = document.getElementById("chat-main");

const chatMainDivMovile = document.getElementById("chat-main-movil");

const userList = document.getElementById("userList");

const userListMovil = document.getElementById("userListMovil");

export function addMessage(user, text) {
    const msgEl = document.createElement("div");

    msgEl.classList.add("message");

    const hr = document.createElement("hr");
    hr.classList.add("sepLine");

    //creacion estructura mensaje
    const img = document.createElement("img");
    img.classList.add("imgChatUser");
    img.src = user.img;

    const divMessage = document.createElement("div");
    divMessage.classList.add("messageText");

    //contiene el nombre , nickname y rol
    const pUserData = document.createElement("p");


    const spanUsChatName = document.createElement("span")
    spanUsChatName.classList.add("userChatName");
    spanUsChatName.innerText = user.name;

    const spanNickName = document.createElement("span");
    spanNickName.classList.add("nickName");
    spanNickName.innerText = user.nickname;

    const spanRol = document.createElement("span");
    spanRol.classList.add(`rol${user.rol}`);
    spanRol.innerText = user.rol;

    //el mensaje a enviar
    const pText = document.createElement("p");
    pText.classList.add("pMessageText");
    pText.innerText = text;


    if (window.innerWidth < 768) {
        //insercion de el mensaje para movil
        pUserData.appendChild(spanUsChatName)
        pUserData.appendChild(spanNickName)
        pUserData.appendChild(spanRol)
        divMessage.appendChild(pUserData);
        divMessage.appendChild(pText);
        msgEl.appendChild(img);
        msgEl.appendChild(divMessage);
        messagesDivMovil.appendChild(msgEl);
        messagesDivMovil.appendChild(hr);
        messagesDivMovil.scrollTop = messagesDivMovil.scrollHeight;
        chatMainDivMovile.scrollTop = chatMainDivMovile.scrollHeight
    } else {
        //insercion de el mensaje para Pc
        pUserData.appendChild(spanUsChatName)
        pUserData.appendChild(spanNickName)
        pUserData.appendChild(spanRol)
        divMessage.appendChild(pUserData);
        divMessage.appendChild(pText);
        msgEl.appendChild(img);
        msgEl.appendChild(divMessage);
        messagesDiv.appendChild(msgEl);
        messagesDiv.appendChild(hr);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        chatMainDiv.scrollTop = chatMainDiv.scrollHeight
    }





}

export function onInit(user){
    
      document.querySelector("#user").innerHTML = `
      <img class="imgUser" src="${user.img}" alt="">
      <p class="contentUser">${user.name} <span class="nickName">@${user.nickname}</span></p>
      <button id="configBtn" ><i class="material-symbols-outlined">settings_account_box</i></button>
      `;
    
      const configBtn = document.getElementById("configBtn");
      configBtn.addEventListener("click", () => {
        showConfigModal(user);
      });
}


export function addHistorial(chanel, message) {
    switch (chanel) {
        case "sala":
            document.getElementById("nameChanel").innerText = "#🏠 | SALA"
            addHistoricalMessages(message)
            break;
        case "bugs":
            document.getElementById("nameChanel").innerText = "#🪲 | BUGS"
            addHistoricalMessages(message)
            break;
        case "desarrollo":
            document.getElementById("nameChanel").innerText = "#💻 | DESARROLLO"
            addHistoricalMessages(message)
            break;
    }

}

function addHistoricalMessages(messages) {

    messagesDiv.innerHTML = ""
    messagesDivMovil.innerHTML = ""
    messages.forEach(u => {
        const msgEl = document.createElement("div");
        msgEl.classList.add("message");
        const hr = document.createElement("hr");
        hr.classList.add("sepLine");
        msgEl.innerHTML = `
    
    <img class="imgChatUser" src="${u.img}" alt="">

    <div class="messageText">
        <p><span class="userChatName">${u.userName}</span><span class="nickName">@${u.nickname}</span><span class="rol${u.rol}">${u.rol}</span></p>

        <p class="pMessageText">
            ${u.text}
        </p>

    </div>

    `;



        if (window.innerWidth < 768) {
            messagesDivMovil.appendChild(msgEl)
            messagesDivMovil.appendChild(hr)
            messagesDivMovil.scrollTop = messagesDivMovil.scrollHeight;
        } else {
            messagesDiv.appendChild(msgEl);
            messagesDiv.appendChild(hr);

            messagesDiv.scrollTop = messagesDiv.scrollHeight;

        }



    })
}


//fin cod agregado 

export function showConfigModal(user) {
    const configModal = document.getElementById("config-modal");
    const editModal = document.getElementById("edit-modal");
    const closeModalBtn = configModal.querySelector(".close-modal");
    const cancelBtn = document.getElementById("cancelBtn");
    const editBtn = document.getElementById("editBtn");
    const panels = ["panelChannels", "panelChat", "panelUsers", "panelTU", "panelEditar"];

    // Rellenar campos del modal de vista
    if (user) {
        configModal.querySelector("h3").textContent = user.name || "Sin nombre";
        configModal.querySelector("p").textContent = "@" + (user.nickname || "Sin alias");

        // También rellenar el modal de edición por si lo abre después
        document.getElementById("editName").value = user.name || "";
        document.getElementById("editAlias").value = user.nickname || "";
    }

    panels.forEach((id) => {
        const el = document.getElementById(id);
        el.classList.add("hidden")
        if (!el) return;
        if (id === "panelTU") el.classList.remove("hidden");
    });


    configModal.classList.remove("hidden");



    closeModalBtn.onclick = () => {
        configModal.classList.add("hidden");
        panels.forEach((id) => {
            console.log("hola afuera" + "panelId")

            const el = document.getElementById(id);
            el.classList.add("hidden")
            if (!el) return;
            if (id === "panelChannels") el.classList.remove("hidden");
        });
    }
    cancelBtn.onclick = () => {
        configModal.classList.add("hidden");
        panels.forEach((id) => {
            console.log("hola afuera" + "panelId")

            const el = document.getElementById(id);
            el.classList.add("hidden")
            if (!el) return;
            if (id === "panelChannels") el.classList.remove("hidden");
        });
    }

    editBtn.onclick = () => {
        configModal.classList.add("hidden");
        editModal.classList.remove("hidden");

        panels.forEach((id) => {
            console.log("hola afuera" + "panelId")

            const el = document.getElementById(id);
            el.classList.add("hidden")
            if (!el) return;
            if (id === "panelEditar") el.classList.remove("hidden");
        });
    };

    // Cierre del modal de edición
    document.querySelector(".close-edit-modal").onclick = () => {
        editModal.classList.add("hidden");


        panels.forEach((id) => {
            console.log("hola mundo panel")
            const el = document.getElementById(id);
            el.classList.add("hidden")
            if (!el) return;
            if (id === "panelChannels") el.classList.remove("hidden");
        });

    }
    document.getElementById("cancelEditBtn").onclick = () => editModal.classList.add("hidden");

    // Guardar
    document.getElementById("saveBtn").onclick = () => {
        const name = document.getElementById("editName").value;
        const alias = document.getElementById("editAlias").value;

        console.log("Guardar:", name, alias);


        editModal.classList.add("hidden");
    };
}

export function showEditModalMobile(user) {
    const configModal = document.getElementById("config-modal");
    const editModal = document.getElementById("edit-modal");
    const panels = ["panelChannels", "panelChat", "panelUsers", "panelTU", "panelEditar"];

    document.getElementById("editName").value = user.name || "";
    document.getElementById("editAlias").value = user.nickname || "";
    configModal.classList.add("hidden");
    editModal.classList.remove("hidden");
    editBtn.onclick = () => {
        configModal.classList.add("hidden");
        editModal.classList.remove("hidden");

        panels.forEach((id) => {

            const el = document.getElementById(id);
            el.classList.add("hidden")
            if (!el) return;
            if (id === "panelEditar") el.classList.remove("hidden");
        });
    };

    // Cierre del modal de edición
    document.querySelector(".close-edit-modal").onclick = () => {
        editModal.classList.add("hidden");


        panels.forEach((id) => {
            console.log("hola mundo panel")
            const el = document.getElementById(id);
            el.classList.add("hidden")
            if (!el) return;
            if (id === "panelChannels") el.classList.remove("hidden");
        });

    }

    // Guardar
    document.getElementById("saveBtn").onclick = () => {
        const name = document.getElementById("editName").value;
        const alias = document.getElementById("editAlias").value;

        console.log("Guardar:", name, alias);


        editModal.classList.add("hidden");
    };
}


export function addSystemMessage(text) {
}

export function updateUserList(users) {

    userList.innerHTML = "";
    userListMovil.innerHTML = ""
    users.forEach(u => {
        const hr = document.createElement("hr");
        hr.classList.add("sepLineUsers")
        const div = document.createElement("div");
        div.classList.add("user-item");

        div.innerHTML = `
    <img class="imgUserList" src="${u.img}" alt="">
    <div class="userListText">
        <p><span class="userChatName">${u.name}</span><span class="nickName"> @${u.nickname}</span><span></p>
        
        <p class="pListUser"><span class="${u.connected ? "buttonOnline" : "buttonOffline"}"></span>${u.connected ? "En linea" : "Desconectado"}</p>
    
    </div>

    
        `;
        if (window.innerWidth < 768) {

            userListMovil.appendChild(div)
            userListMovil.appendChild(hr)
        } else {
            userList.appendChild(div);
            userList.appendChild(hr)
        }
    });
}

export function showUserList(list, show) {
    if (show) {
        list.classList.add("active");
    } else {
        list.classList.remove("active");
    }
}

export function clearUser() {
    localStorage.removeItem("user");
}

export function redirectToLogin() {
    window.location.href = "/login.html";
}

