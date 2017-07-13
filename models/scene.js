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

module.exports = Scene;
module.exports.findSceneFromAccessCode = findSceneFromAccessCode;