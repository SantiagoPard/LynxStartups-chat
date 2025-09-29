function broadcast(users, data) {
    const msg = JSON.stringify(data);
    users.forEach(u => {
        if (u.ws.readyState === 1) {
            u.ws.send(msg);
        }
    });
}

function broadcastChanel(users, data){
     const msg = JSON.stringify(data);
    users.forEach(u => {
        if (u.ws.readyState === 1) {
            if(u.chanel == data.chanel)
                u.ws.send(msg);
        }
    });
}

module.exports = { broadcast, broadcastChanel };