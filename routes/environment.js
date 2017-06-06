var routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const Environment = require('../models/environment');

api.put('/scene/:scene_id/environment',function(req,res) {
    const id = req.params.scene_id;
    Scene.findOne({_id: id}, 'environment', function(err,scene) {
        const envId = scene.environment;
        Environment.findOneAndUpdate({_id: envId},req.body,{new: true}, function(err1,env) {
            if(err1) return handleError(err1);
            res.json(env);
        });
    });
});