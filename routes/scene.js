const routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const Environment = require('../models/environment');
const Model = require('../models/model');
const randomString = require('randomstring');

api.get('/scene/:scene_id',function(req,res) {
    const id = req.params.scene_id;
    Scene.findById(id, function (err, scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        res.json(scene);
    });
});

api.get('/scene/:scene_id/full',function(req,res) {
    const id = req.params.scene_id;
    Scene.findById(id, function (err, scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        Scene.getFullScene(scene,function(fullScene) {
            res.json(fullScene);
        });
    });
});

api.get('/newscene',function(req,res) {
    const environment = new Environment({
        skybox_type: "grid",
        skybox_size: 50,
        skybox_position: 25,
        camera_height: 1.5
    });
    environment.save(function(err) {
        Scene.create({
            name: 'New Scene',
            environmentId: environment.id,
            environment: null,
            accessCode: randomString.generate(7).toUpperCase(),
        },function(err,scene) {
            if(err) return handleError(err);
            res.json(scene);
        });
    });
});

api.put('/scene/:scene_id',function(req,res) {
    const id = req.params.scene_id;
    console.log(req.body);
    Scene.findOneAndUpdate({_id: id},req.body,{new: true}, function(err,scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        res.json(scene);
    });
});

api.delete('/scene/:scene_id',function(req,res) {
    const id = req.params.scene_id;
    Scene.deleteSceneById(id,function(data) {
        res.json(data);
    });
});