const messagesDiv = document.getElementById("messages");
// chat-main
const chatMainDiv = document.getElementById("chat-main");

const userList = document.getElementById("userList");

export function addMessage(user, text) {
    const msgEl = document.createElement("div");

    msgEl.classList.add("message");
    console.log(user)
    const hr = document.createElement("hr");
    hr.classList.add("sepLine");

    msgEl.innerHTML = `
    
    <img class="imgChatUser" src="https://cdn-icons-png.flaticon.com/512/1361/1361728.png" alt="">

    <div class="messageText">
        <p><span class="userChatName">${user.name}</span><span class="nickName">@${user.nickname}</span><span class="rol">${user.rol}</span></p>

        <p class="pMessageText">
            ${text}
        </p>

    </div>

    `;

    messagesDiv.appendChild(msgEl);
    messagesDiv.appendChild(hr);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    document.getElementById("chat-main").scrollTop = document.getElementById("chat-main").scrollHeight

    console.log(chatMainDiv.scrollHeight)

}

export function addHistorial(chanel, message) {
    // messagesDiv.innerHTML = "";
    console.log(chanel)
    switch (chanel) {
        case "sala":
            document.getElementById("nameChanel").innerText = "#🏠 | SALA"
            addHistoricalMessages(message)
            break;
        case "bugs":
            document.getElementById("nameChanel").innerText = "#🪲 | Bugs"
            addHistoricalMessages(message)
            break;
        case "desarrollo":
            document.getElementById("nameChanel").innerText = "#💻 | Bugs"

            addHistoricalMessages(message)
            break;
    }

}

function addHistoricalMessages(messages) {

    messagesDiv.innerHTML = ""
    messages.forEach(u => {
        const msgEl = document.createElement("div");
        msgEl.classList.add("message");
        const hr = document.createElement("hr");
        hr.classList.add("sepLine");
        msgEl.innerHTML = `
    
    <img class="imgChatUser" src="https://cdn-icons-png.flaticon.com/512/1361/1361728.png" alt="">

    <div class="messageText">
        <p><span class="userChatName">${u.userName}</span><span class="nickName">@${u.nickname}</span><span class="rol">${u.rol}</span></p>

        <p class="pMessageText">
            ${u.text}
        </p>

    </div>

    `;

        messagesDiv.appendChild(msgEl);
        messagesDiv.appendChild(hr);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    })
}
//fin cod agregado 

export function showConfigModal(user) {
    const configModal = document.getElementById("config-modal");
    const editModal = document.getElementById("edit-modal");
    const closeModalBtn = configModal.querySelector(".close-modal");
    const cancelBtn = document.getElementById("cancelBtn");
    const editBtn = document.getElementById("editBtn");

    // Rellenar campos del modal de vista
    if (user) {
        configModal.querySelector("h3").textContent = user.name || "Sin nombre";
        configModal.querySelector("p").textContent = "@" + (user.nickname || "Sin alias");

        // También rellenar el modal de edición por si lo abre después
        document.getElementById("editName").value = user.name || "";
        document.getElementById("editAlias").value = user.nickname || "";
    }

    configModal.classList.remove("hidden");

    closeModalBtn.onclick = () => configModal.classList.add("hidden");
    cancelBtn.onclick = () => configModal.classList.add("hidden");

    editBtn.onclick = () => {
        configModal.classList.add("hidden");
        editModal.classList.remove("hidden");
    };

    // Cierre del modal de edición
    document.querySelector(".close-edit-modal").onclick = () => editModal.classList.add("hidden");
    document.getElementById("cancelEditBtn").onclick = () => editModal.classList.add("hidden");

    // Guardar
    document.getElementById("saveBtn").onclick = () => {
        const name = document.getElementById("editName").value;
        const alias = document.getElementById("editAlias").value;

        console.log("Guardar:", name, alias);


        editModal.classList.add("hidden");
    };
}




export function addSystemMessage(text) {
    // console.log(text)
}

export function updateUserList(users) {
    // console.log(users)
    userList.innerHTML = "";
    users.forEach(u => {
        const hr = document.createElement("hr");
        hr.classList.add("sepLineUsers")
        const div = document.createElement("div");
        div.classList.add("user-item");

        div.innerHTML = `
    <img class="imgUserList" src="https://cdn-icons-png.flaticon.com/512/1361/1361728.png" alt="">
    <div class="userListText">
        <p><span class="userChatName">${u.name}</span><span class="nickName"> @${u.nickname}</span><span></p>
        
        <p class="pListUser"><span class="${u.connected ? "buttonOnline" : "buttonOffline"}"></span>${u.connected ? "En linea" : "Desconectado"}</p>
    
    </div>

    
        `;

        userList.appendChild(div);
        userList.appendChild(hr)
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