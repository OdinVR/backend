const mongoose = require('../db');

const fileio = require('../fileio');

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
	spin_axis: String,
	filename: String,
	scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene'},
});

const Model = mongoose.model('Model', ModelSchema);

function deleteModel(modelId,callback) {
    Model.findOneAndRemove({_id: modelId},function(err,model) {
		if(! model) return callback({error: "No model to delete"});
        console.log("model",model,"err",err);
        if(err) {
            callback({error: err});
            return
        }
        fileio.deleteModelFile(model,function(json){
			callback(json);
        });
    });
}

module.exports = Model;
module.exports.deleteModel = deleteModel;