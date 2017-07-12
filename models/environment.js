const mongoose = require('../db');
const fileio = require('../fileio');

const EnvironmentSchema = mongoose.Schema({
    skybox_type: String,
	skybox_size: Number,
	skybox_file: String, // Will be blank if using default skysphere
	skybox_name: String, // ^
	skybox_position: Number,
	camera_height: Number,
	scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene'},
});

function removeSkysphere(environment,callback) {
	if(!environment || !environment.skybox_file || environment.skybox_file.length === 0 || !environment.skybox_file.includes('https://odinvr.s3.us-east-2.amazonaws.com/public/skyspheres/')) return;
	fileio.deleteSkysphere(environment.skybox_file.replace('https://odinvr.s3.us-east-2.amazonaws.com/',''),function(data) {
		callback(data);
	});
}

module.exports = mongoose.model('Environment', EnvironmentSchema);
module.exports.removeSkysphere = removeSkysphere;