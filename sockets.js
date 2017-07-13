let socketListeners = {};

const routes = require('./routes/routes.js');
const server = routes.server;

const io = require('socket.io').listen(server);

startSockets();

function startSockets() {
    console.log("start socket")
    io.on('connection', function(socket) {
        console.log("connected");
    });
}