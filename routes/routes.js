var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var figlet = require('figlet');
var app = express();

var api = express.Router();

app.use('/api/v1', api);
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

module.exports.app = app;
module.exports.api = api;

require('./scene');

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