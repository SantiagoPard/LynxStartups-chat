import { addMessage, addSystemMessage, updateUserList, addHistorial } from "../ui/chatUI.js";

let socket;

export function connect(user) {
    let wsUrl = location.hostname === "localhost" ? "ws://localhost:3000" : `wss://${location.host}`;

    socket = new WebSocket(wsUrl);

    socket.addEventListener("open", () => {
        socket.send(JSON.stringify({
            type: "login",
            user
        }));
    });

    socket.addEventListener("message", (event) => {

        const data = JSON.parse(event.data);

        switch (data.type) {
            case "chat":
                addMessage(data.user, data.text, data.chanel, data.user.id === user.id);
                break;
            case "chanel":
                addHistorial(data.chanel, data.historial)
                break;
            case "system":
                addSystemMessage(data.text);
                break;
            case "users":
                updateUserList(data.users);
                break;
            case "usersMovil":
                updateUserList(data.users);
            default:
                throw new Error("Tipo de mensaje desconocido: " + data.type);
        }
    });
}

export function sendMessage(user, text, chanel) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({
        type: "chat",
        user: user,
        text,
        chanel
    }));
}

export function sendMessageChanel(user, chanel) {
    
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({
        user: user,
        type: "chanel",
        chanel,
    }));
}

export function updateUsers() {
    
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({
        type: "usersMovil"
    }));
}