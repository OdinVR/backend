const mongoose = require('../db');
const Model = require('../models/model');

const BroadcastSchema = new mongoose.Schema({
    scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene'},
    accessCode: String,
});

const Broadcast = mongoose.model('Broadcast', BroadcastSchema);

function checkIfBroadcasting(scene,callback) {

}

module.exports = Broadcast;