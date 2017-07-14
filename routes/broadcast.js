const routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const sockets = sockets.js;

api.post('/scene/:scene_id/broadcast',function(req,res) {
    const id = req.params.scene_id;
    Scene.findById(id, function (err, scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        sockets.sendScene(scene);
        res.json(scene);
    });
});

api.post('/scene/:scene_id/broadcast',function(req,res) {
    
});