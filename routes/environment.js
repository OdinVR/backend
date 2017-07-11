var routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const Environment = require('../models/environment');

const fileio = require('../fileio');
const upload = fileio.skysphereUpload;

api.get('/scene/:scene_id/environment',function(req,res) {
    const id = req.params.scene_id;
    Scene.findOne({_id: id}, 'environment', function(err,scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        const envId = scene.environmentId;
        Environment.findOne({_id: envId}, function(err1,env) {
            if(err1) {
                res.send({error: err1});
                return
            }
            res.json(env);
        });
    });
});

api.put('/scene/:scene_id/environment',function(req,res) {
    const id = req.params.scene_id;
    Scene.findOne({_id: id}, 'environment', function(err,scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        const envId = scene.environmentId;
        Environment.findOneAndUpdate({_id: envId},req.body,{new: true}, function(err1,env) {
            if(err1) return handleError(err1);
            res.json(env);
        });
    });
});

api.post('/scene/:scene_id/skysphere',upload.any(),function(req,res) {
    const id = req.params.scene_id;
    if(req.files) {
        console.log("skysphere upload",req.files[0]);
        Scene.findOne({_id: id}, 'environment', function(err,scene) {
            if(routes.handleErrors(err,scene,'Scene',res)) return;
            console.log("scene",scene);
            const envId = scene.environmentId;
            Environment.findOneAndUpdate({_id: envId},{sky_type: 'custom', skysphere_file: req.files[0].location, skysphere_name: req.files[0].originalname},{new: false}, function(err1,env) {
                if(err1) return handleError(err1);
                Environment.removeSkysphere(env,function(removeData){
                    console.log("remove old skysphere: ",removeData);
                });
                Environment.findOne({_id: envId},function(err2,env1) {
                    if(err2) {
                        res.json({error: err2});
                        return
                    }
                    res.json(env1);
                });
            });
        });
    }
});

api.delete('/scene/:scene_id/skysphere',function(req,res){
    const id = req.params.scene_id;
    Scene.findOne({_id: id}, 'environment', function(err,scene) {
        if(routes.handleErrors(err,scene,'Scene',res)) return;
        const envId = scene.environmentId;
        Environment.findOneAndUpdate({_id: envId},{sky_type: 'grid', skysphere_file: '', skysphere_name: ''},{new: false}, function(err1,env) {
                if(err1) return handleError(err1);
                Environment.removeSkysphere(env,function(removeData){
                    console.log("remove old skysphere: ",removeData);
                });
                Environment.findOne({_id: envId},function(err2,env1) {
                    if(err2) {
                        res.json({error: err2});
                        return
                    }
                    res.json(env1);
                });
            });
    });
});