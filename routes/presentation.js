const routes = require('./routes');

const api = routes.api;
const Scene = require('../models/scene');
const Presentation = require('../models/presentation');

api.get('/presentation/:presentation_id',function(req,res) {
    const id = req.params.presentation_id;
    Presentation.findById(id, function (err, presentation) {
        if(routes.handleErrors(err,presentation,'Presentation',res)) return;
        res.json(presentation);
    });
});

api.post('/presentation',function(req,res) {
    Presentation.create(req.body,function(err,presentation) {
        if(routes.handleErrors(err,presentation,'Presentation',res)) return;
        res.json(presentation);
    })
});