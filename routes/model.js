var routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const Model = require('../models/model');

const fileio = require('../fileio');

const upload = fileio.modelUpload;

const app = routes.app;

app.post('/api/v1/scene/:scene_id/model/file',upload.any(), function(req,res) {
    const id = req.params.scene_id;
    console.log("req file");
    if(req.files != undefined) {
        console.log(req.files[0]);

        fileio.extractModelTempAndUpload(req.files[0],function(url,err) {
            if(err) {
                res.json({error: err})
                return
            }
            Model.create({
                name: req.files[0].originalname.replace('.zip',''),
                url: url,
                xposition: 0,
                yposition: 0,
                zposition: 0,
                scale: 1,
                xrotation: 0,
                yrotation: 0,
                zrotation: 0,
                spin: false,
                spin_axis: 0,
            },function(err1,model) {
                if(err1) return handleError(err1);
                Scene.findOne({_id: id}, 'models', function(err2,scene) {
                    if(err2) return res.json({error: err2});
                    scene.models.push(model.id);
                    scene.save(function (err3) {
                        if (err3) return handleError(err);
                    })
                });
                res.json(model);
            })
        });
        /*;*/
    }
    
});

api.put('scene/:scene_id/model/:model_id', function(req,res) {
    const id = req.params.scene_id;
    const modelId = req.params.model_id;
    Scene.findOne({_id: id}, 'models', function(err,scene) {
        Model.findOneAndUpdate({_id: modelId},req.body,{new: true}, function(err1,model) {
            if(err1) return handleError(err1);
            res.json(model);
        });
    });
});