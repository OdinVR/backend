let socketListeners = {};

const routes = require('./routes/routes.js');
const server = routes.server;

const io = require('socket.io').listen(server);

const Scene = require('./models/scene');

startSockets();

function startSockets() {
    io.on('connection', function(socket) {
        console.log("connected");
        socket.on('room',function(data) {
            console.log("room join request",data.room);
            if(!data.room) return;
            Scene.findSceneFromAccessCode(data.room,function(sceneData){
                socket.emit('accessResponse',sceneData);
            });
        });
    });
}