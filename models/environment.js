const mongoose = require('../db');
const fileio = require('../fileio');

const EnvironmentSchema = mongoose.Schema({
    sky_type: String,
	sky_size: Number,
	skysphere_file: String, // Will be blank if using default skysphere
	skysphere_name: String, // ^
	sky_position: Number,
	camera_height: Number,
	scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene'},
});

function removeSkysphere(environment,callback) {
	if(!environment || !environment.skysphere_file || environment.skysphere_file.length === 0 || !environment.skysphere_file.includes('https://odinvr.s3.us-east-2.amazonaws.com/public/skyspheres/')) return;
	fileio.deleteSkysphere(environment.skysphere_file.replace('https://odinvr.s3.us-east-2.amazonaws.com/',''),function(data) {
		callback(data);
	});
}

module.exports = mongoose.model('Environment', EnvironmentSchema);
module.exports.removeSkysphere = removeSkysphere;