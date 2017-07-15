const routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const sockets = sockets.js;

//start broadcasting a scene
api.post('/scene/:scene_id/broadcast',function(req,res) {
    const id = req.params.scene_id;
    Scene.findById(id, function (err, scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        sockets.sendScene(scene);
        res.json(scene);
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
            res.json(broadcast);
        });
    });
    
});

//stop a broadcast with code independent of scene
api.delete('/broadcast/:broadcast_id',function(req,res) {
    const broadcastId = req.params.broadcast_id;
});

//stop a broadcast by scene
api.delete('/scene/:scene_id/broadcast',function(req,res) {
    
});

