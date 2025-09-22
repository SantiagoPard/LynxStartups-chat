const messagesDiv = document.getElementById("messages");
const userList = document.getElementById("userList");

// function fixChatHeight() {
//     document.querySelector(".chat-container").style.height = window.innerHeight + "px";
// }
// window.addEventListener("resize", fixChatHeight);
// fixChatHeight();

//cod del profe
// export function addMessage(user, text, isSelf = false) {
//     const msgEl = document.createElement("div");
//     msgEl.classList.add("message");
//     if (isSelf) msgEl.classList.add("self");
//     msgEl.innerHTML = `<strong>${user}: </strong>${text}`;
//     messagesDiv.appendChild(msgEl);
//     messagesDiv.scrollTop = messagesDiv.scrollHeight;
// }

//cod agregado

export function addMessage(user, text, isSelf = false) {
    const msgEl = document.createElement("div");
    msgEl.classList.add("message");
    if (isSelf) msgEl.classList.add("self");
    const hr = document.createElement("hr");
    hr.classList.add("sepLine");

    msgEl.innerHTML = `
    
    <img style="width: 64px; height: 64px;" src="https://cdn-icons-png.flaticon.com/512/1361/1361728.png" alt="">

    <div class="messageText"  style="display: flex; flex-direction: column; padding-left:10px;">
        <p><span class="userChatName">${user.name}</span><span class="nickName">@hola</span><span class="rol">Developer</span></p>

        <p style="padding-left: 24px; color: #000;">
            ${text}
        </p>

    </div>

    `;

    messagesDiv.appendChild(msgEl);
    messagesDiv.appendChild(hr);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;


}

//fin cod agregado 



export function addSystemMessage(text) {
    console.log(text)
}

export function updateUserList(users) {
    userList.innerHTML = "";
    users.forEach(u => {
        console.log(u)
    const hr = document.createElement("hr");
    hr.classList.add("sepLineUsers")
    const div = document.createElement("div");
    div.classList.add("user-item");

    div.innerHTML = `
    <img style="width: 50px; height: 50px;" src="https://cdn-icons-png.flaticon.com/512/1361/1361728.png" alt="">
    <div style="display: flex; flex-direction: column; justify-content: center;  width: 100%; padding: 0px 0px 0px 6px;">
        <p><span class="userChatName">${u.name}</span><span class="nickName"> @${u.nickname}</span><span></p>
        
        <p class="messageText"><span class="${u.connected ? "buttonOnline" : "buttonOffline"}"></span>${u.connected ? "En linea" : "Desconectado"}</p>
    
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
