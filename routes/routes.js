var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var figlet = require('figlet');
var path = require('path');
var app = express();

var api = express.Router();
app.use('/api/v1', api);
app.use(cors());

api.use(cors());
api.use(bodyparser.json());
app.use(express.static('public'));

module.exports.app = app;
module.exports.api = api;

require('./scene');
require('./environment');
require('./model');

app.get('/', (req, res) => {
    res.send('OdinVR');
});

const port = 6606;

const server = app.listen(port, () => {
    figlet.text('OdinVR', {
        font: 'Graffiti'
    }, function(err, data) {
        console.log(data);
    });
    console.log("Running on port " + port);
});

function handleErrors(err,obj,name,res) {
    if(err) {
        res.json({error: err});
        return true
    }
    if(!obj) {
        res.json({error: name + ' not found'});
        return true
    }
    return false
}

module.exports.handleErrors = handleErrors;
module.exports.server = server;