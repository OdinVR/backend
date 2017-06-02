const mongoose = require('mongoose');

const EnvironmentSchema = mongoose.Schema({
    skybox_type: string,
	skybox_size: number,
	skybox_position: number,
	camera_height: number
});

module.exports.Model = mongoose.model('Model', ModelSchema);