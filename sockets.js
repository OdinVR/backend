let socketListeners = {};

const routes = require('./routes/routes.js');
const server = routes.server;

const io = require('socket.io').listen(server);

const Scene = require('./models/scene');

function startSockets() {
    io.on('connection', function(socket) {
        console.log("connected");
        socket.on('room',function(data) {
            console.log("room join request",data.room);
            if(!data.room) return;
            Scene.findSceneFromAccessCode(data.room,function(sceneData){
                socket.emit('accessResponse',sceneData);
                if(!sceneData.error) {
                    if(!socketListeners[sceneData.accessCode]) {
                        socketListeners[sceneData.accessCode] = [socket];
                    } else {
                        socketListeners[sceneData.accessCode].push(socket);
                    }
                }
            });
        });
    });
}

function sendScene(scene) {

}

module.exports.startSockets = startSockets;
module.exports.sendScene = sendScene;