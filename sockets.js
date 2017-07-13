let socketListeners = {};

const routes = require('./routes/routes.js');
const server = routes.server;

const io = require('socket.io')(server);

startSockets();

function startSockets() {
    io.on('connection', function(socket) {
        console.log("connected",socket);
    });
}