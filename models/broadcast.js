const mongoose = require('../db');

const BroadcastSchema = new mongoose.Schema({
    scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene'},
    presentation: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentation'},
});

const Broadcast = mongoose.model('Broadcast', BroadcastSchema);

function checkIfBroadcasting(scene,callback) {
    
}

module.exports = Broadcast;