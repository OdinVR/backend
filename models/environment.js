const mongoose = require('mongoose');

const EnvironmentSchema = mongoose.Schema({
    skybox_type: string,
	skybox_size: number,
	skybox_file: string, // Will be blank if using default skybox
	skybox_name: string, // ^
	skybox_position: number,
	camera_height: number
});

module.exports = mongoose.model('Environment', ModelSchema);