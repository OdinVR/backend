const mongoose = require('../db');
const Model = require('../models/model');
const Environment = require('../models/environment.js');

const SceneSchema = new mongoose.Schema({
	name: String,
	models: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Model'}],
	environmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Environment'},
	accessCode: String,
});

module.exports = mongoose.model('Scene', SceneSchema);