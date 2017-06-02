var express = require('express');
var figlet = require('figlet');
var app = express();

var api = express.Router();

app.use('/api/v1', api);

module.exports.app = app;
module.exports.api = api;

app.get('/', (req, res) => {
    res.send('OdinVR');
});

const port = 6606;

app.listen(port, () => {
    figlet.text('OdinVR', {
        font: 'Graffiti'
    }, function(err, data) {
        console.log(data);
    });
    console.log("Running on port " + port);
});