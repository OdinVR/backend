const mongoose = require('mongoose');
const Model = require('../models/model');
const Environment = require('../models/environment.js');

const SceneSchema = new mongoose.Schema({
	name: String,
	models: [{ type: Schema.Types.ObjectId, ref: 'Model'}],
	environment: { type: Schema.Types.ObjectId, ref: 'Environment'}
});

module.exports = mongoose.model('Scene', SceneSchema);