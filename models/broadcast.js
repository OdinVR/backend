const mongoose = require('../db');
const Model = require('../models/model');

const BroadcastSchema = new mongoose.Schema({
	scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene'},
});

const Broadcast = mongoose.model('Broadcast', BroadcastSchema);

module.exports = Broadcast;