const mongoose = require('../db');

const EnvironmentSchema = mongoose.Schema({
    skybox_type: String,
	skybox_size: Number,
	skybox_file: String, // Will be blank if using default skybox
	skybox_name: String, // ^
	skybox_position: Number,
	camera_height: Number,
	scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene'},
});

module.exports = mongoose.model('Environment', EnvironmentSchema);