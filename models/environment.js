const mongoose = require('../db');

const EnvironmentSchema = mongoose.Schema({
    sky_type: String,
	sky_size: Number,
	skysphere_file: String, // Will be blank if using default skysphere
	skysphere_name: String, // ^
	sky_position: Number,
	camera_height: Number,
	scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene'},
});

function removeSkysphere(environment) {

}

module.exports = mongoose.model('Environment', EnvironmentSchema);