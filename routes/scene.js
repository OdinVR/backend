var routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');

api.get('/scene/:scene_id',function(req,res) {
    var id = params.scene_id;
    Tank.findById(id, function (err, scene) {
        if (err) return handleError(err);
        res.json(scene);
    });
});