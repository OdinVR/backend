const mongoose = require('../db');

const ModelSchema = mongoose.Schema({
	name: String,
	url: String,
	xposition: Number,
	yposition: Number,
	zposition: Number,
	scale: Number,
	xrotation: Number,
	yrotation: Number,
	zrotation: Number,
	spin: Boolean,
	spin_axis: String
});

module.exports = mongoose.model('Model', ModelSchema);