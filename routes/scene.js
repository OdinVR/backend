var routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const Environment = require('../models/environment');
api.get('/scene/:scene_id',function(req,res) {
    var id = req.params.scene_id;
    Tank.findById(id, function (err, scene) {
        if (err) return handleError(err);
        res.json(scene);
    });
});

api.get('/newscene',function(req,res) {
    const environment = new Environment({
        skybox_type: "grid",
        skybox_size: 50,
        skybox_position: 25,
        canera_height: 1.5
    });
    environment.save(function(err) {
        Scene.create({
            name: 'New Scene',
            environment: environment.id
        },function(err,scene) {
            if(err) return handleError(err);
            res.json(scene);
        });
    });
});

api.post('/scene',function(req,res) {
    const environment = new Environment({
        skybox_type: "grid",
        skybox_size: 50,
        skybox_position: 25,
        canera_height: 1.5
    });
    Scene.create({
        name: 'New scene',
    },function(err, scene) {
        
    });
});