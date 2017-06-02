const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    _id: String,
	name: String,
	url: String,
	xposition: Number,
	yposition: Number,
	zposition: Number,
	scale: Number,
	xrotation: Number,
	yrotation: Number,
	zrotation, Number,
	spin: Boolean,
	spin_axis: String
});

module.exports.Model = mongoose.model('Model', ModelSchema);