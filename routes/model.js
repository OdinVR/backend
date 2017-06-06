var routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const Model = require('../models/model');

const fileio = require('../fileio');

const upload = fileio.upload;

const app = routes.app;

app.post('/api/v1/scene/:scene_id/model/file',upload.any(), function(req,res) {
    const id = req.params.scene_id;
    console.log(req.file);
});