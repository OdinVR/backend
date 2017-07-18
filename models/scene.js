const mongoose = require('../db');
const Model = require('../models/model');
const Environment = require('../models/environment.js');

const SceneSchema = new mongoose.Schema({
	name: String,
	models: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Model'}],
	environmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Environment'},
	presentationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentation'},
});

const Scene = mongoose.model('Scene', SceneSchema);

function findSceneFromAccessCode(code,callback) {
	Scene.findOne({accessCode: code},function(err,scene) {
		if(err) {
			callback({error: err});
			return
		}
		if(!scene) {
			callback({error: 'Scene does not exist. Please try a different code.'});
			return
		}
		callback(scene);
	});
	
}

function getFullScene(scene,callback) {
	const envId = scene.environmentId;
    Environment.findOne({_id: envId}, function(err,env) {
		let fullScene = JSON.parse(JSON.stringify(scene));
		if(err) {
			callback({error: err});
			return
		}
		fullScene.environment = env;
		console.log(fullScene);
		Model.find({scene: scene._id},function(err1,models) {
			if(err1) {
				callback({error: err1});
				return
			}
			fullScene.models = models;
			callback(fullScene);
		});
	});
}

function deleteSceneById(id,callback) {
	Scene.findOneAndRemove({_id: id},function(err,scene,result) {
        if(err) {
			callback({error: err});
			return
		}
		if(!scene) {
			callback({error: 'Scene not found'});
			return
		}
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
        callback(scene);
        Model.find({scene: id},function(err1,models) {
            if(err1) {
                callback({error: err1})
                return
            }
            console.log("models",models);
            models.forEach(function(model) {
                Model.deleteModel(model.id,function(json) {
                    console.log("DELETE MODEL RESULT",json)
                });
            });
            console.log("models",models);
        });
    });
}

module.exports = Scene;
module.exports.findSceneFromAccessCode = findSceneFromAccessCode;
module.exports.getFullScene = getFullScene;
module.exports.deleteSceneById = deleteSceneById;