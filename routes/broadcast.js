const routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const sockets = sockets.js;

//start broadcasting a scene
api.post('/scene/:scene_id/broadcast',function(req,res) {
    const id = req.params.scene_id;
    Scene.findById(id, function (err, scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        Broadcast.create({
            scene: id,
            accessCode: scene.accessCode,
        },function(err1,broadcast) {
            if(err1) {
                res.json({error: err1});
                return
            }
            //TODO: send broadcast over socket.io
            res.json(broadcast);
        });
    });
});

//set scene being broadcasted a specific broadcast
api.put('/broadcast/:broadcast_id/scene/:scene_id',function(req,res) {
    const broadcastId = req.params.broadcast_id;
    const id = req.params.scene_id;
    Scene.findById(id, function (err, scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        Broadcast.findOneAndUpdate({_id: broadcastId},{scene: id},{new: true},function(err1,broadcast) {
            if(routes.handleErrors(err1,broadcast,'Broadcast',res)) return;
            //TODO: update scene over socket.io
            res.json(broadcast);
        });
    });
    
});

//stop a broadcast with broadcast id
api.delete('/broadcast/:broadcast_id',function(req,res) {
    const broadcastId = req.params.broadcast_id;
    Broadcast.findOneAndRemove({_id: broadcastId},function(err,broadcast,result) {
        if(routes.handleErrors(err,broadcast,'Broadcast',res)) return;
        //TODO: send stop broadcast over socket.io
        res.json(broadcast);
    });
});

//stop a broadcast by scene
api.delete('/scene/:scene_id/broadcast',function(req,res) {
    const id = req.params.scene_id;
    Scene.findById(id, function (err, scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        Broadcast.findOneAndRemove({scene: id},function(err1,broadcast,result) {
            if(routes.handleErrors(err1,broadcast,'Broadcast',res)) return;
            //TODO: send stop broadcast over socket.io
            res.json(broadcast);
        });
    });
});

