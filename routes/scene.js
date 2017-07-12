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
    Scene.findOneAndRemove({_id: id},function(err,scene,result) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        const envId = scene.environmentId;
        Environment.findOneAndRemove({_id: envId},function(err1,env) {
            Environment.removeSkysphere(env,function(removeData) {
                console.log("remove skysphere ",removeData);
            });
            if(err1) {
                console.log("Error deleting environment",err1);
                return
            }
            console.log("deleted env",env);
        });
        res.json(scene);
        Model.find({scene: id},function(err1,models) {
            if(err1) {
                res.json({error: err1})
                return
            }
            console.log("models",models);
            models.forEach(function(model) {
                Model.deleteModel(model.id,function(json) {
                    console.log("DELETE MODEL RESULT",json)
                });
            })
            console.log("models",models);
            // TODO: Delete all of the models from a scene 
        });
    })
});