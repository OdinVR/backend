const mongoose = require('../db');
const Model = require('../models/model');
const Environment = require('../models/environment.js');

const SceneSchema = new mongoose.Schema({
	name: String,
	models: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Model'}],
	environmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Environment'},
	accessCode: String,
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

module.exports = Scene;
module.exports.findSceneFromAccessCode = findSceneFromAccessCode;
module.exports.getFullScene = getFullScene;