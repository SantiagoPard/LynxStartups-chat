const { broadcast, broadcastChanel } = require("../utils/broadcast");
// const broadcastChanel = require("../utils/broadcast");
const { getUsers } = require("../models/users");

let users = [];
let messageBodySala = [];
let messageBodyBugs = [];
let messageBodyDev = [];


function setupChat(wss) {
    wss.on("connection", (ws, req) => {
        let currentUser = null;
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;

        ws.on("message", (msg) => {
            const data = JSON.parse(msg);

            if (data.type === "login") {
                currentUser = { id: data.user.id, name: data.user.name, chanel: data.user.chanel, ws };

                users.push(currentUser);

                console.log(`${new Date().toISOString()} - 🟢 Cliente conectado (${currentUser.name} | ${ip})`);

                broadcast(users, { type: "system", text: `${currentUser.name} se unió` });

                const allUsers = getUsers();
                broadcast(users, {
                    type: "users",
                    users: allUsers.map(u => ({
                        id: u.id,
                        name: u.name,
                        rol: u.rol,
                        nickname: u.nickname,
                        img: u.img,
                        connected: users.some(c => c.id === u.id),
                        chanel: u.chanel
                    }))
                });
            }

            if (data.type === "chat") {
                users.forEach(u => {
                    if (u.name === data.user.name) {
                        u.chanel = data.chanel;
                    }
                });

                let registroMessage =
                {
                    "userName": data.user.name,
                    "rol": data.user.rol,
                    "nickname": data.user.nickname,
                    "text": data.text
                }



                console.log(data.chanel)

                switch (data.chanel) {
                    case "sala":
                        messageBodySala.push(registroMessage)
                        break;
                    case "bugs":
                        messageBodyBugs.push(registroMessage)
                        break;
                    case "desarrollo":
                        messageBodyDev.push(registroMessage)
                        break;
                }

                // console.log(users)   
                broadcastChanel(users, { type: "chat", user: data.user, text: data.text, chanel: data.chanel });
            }

            if (data.type === "chanel") {

                users.forEach(u => {
                    if (u.name === data.user.name) {
                        u.chanel = data.chanel;
                    }
                });

                let historial = []
                switch (data.chanel) {
                    case "sala":
                        historial = messageBodySala
                        break;
                    case "bugs":
                        historial = messageBodyBugs
                        break;
                    case "desarrollo":
                        historial = messageBodyDev
                        break;
                }
                historial = historial;
                console.log(historial)
                ws.send(
                    JSON.stringify({ type: "chanel", chanel: data.chanel, historial: historial })
                );
            }
        });

        ws.on("close", () => {
            if (currentUser) {
                console.log(`${new Date().toISOString()} - 🔴 Cliente desconectado (${currentUser.name} | ${ip})`);
                users = users.filter(u => u !== currentUser);

                broadcast(users, { type: "system", text: `${currentUser.name} salió` });

                const allUsers = getUsers();
                broadcast(users, {
                    type: "users",
                    users: allUsers.map(u => ({
                        id: u.id,
                        name: u.name,
                        rol: u.rol,
                        nickname: u.nickname,
                        img: u.img,
                        connected: users.some(c => c.id === u.id)
                    }))
                });
            }
        });
    });
}

module.exports = setupChat;