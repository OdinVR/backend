const mongoose = require('../db');

const PresentationSchema = new mongoose.Schema({
	name: String,
	sessionCode: String,
	scenes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scene'}],
});

const Presentation = mongoose.model('Presentation', PresentationSchema);

module.exports = Presentation;