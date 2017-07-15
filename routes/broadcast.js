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

//set scene being broadcasted on access code
api.put('/broadcast/:access_code/scene/:scene_id',function(req,res) {
    const accessCode = req.params.access_code;
    const id = req.params.scene_id;
    Scene.findById(id, function (err, scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        Broadcast.findOneAndUpdate({accessCode: accessCode},{scene: id},{new: true},function(err1,broadcast) {
            if(routes.handleErrors(err1,broadcast,'Broadcast',res)) return;
            res.json(broadcast);
        });
    });
    
});

//stop a broadcast with code independent of scene
api.delete('/broadcast/:access_code',function(req,res) {
    
});

//stop a broadcast by scene
api.delete('/scene/:scene_id/broadcast',function(req,res) {
    
});

