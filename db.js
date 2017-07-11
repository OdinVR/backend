var secrets = require('./secrets');

mongoose = require('mongoose'),
mongoose.connect(secrets.mongo_url);
mongoose.Promise = global.Promise;

console.log("db.js");

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
    if(err) {
        console.log('error connecting to db: '+err);
    }
    console.log("it didn't work");
});

module.exports = mongoose;