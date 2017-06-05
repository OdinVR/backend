/*
* OdinVR Web Server
* 
* Andrew Arpasi June 2017
*/


mongoose = require('mongoose'),
multer = require('multer'),
unzip = require('unzip'),
s3fs = require('s3fs'),

routes = require('./routes/routes.js'),

secrets = reqiure('./secrets.js');

mongoose.connect(secrets.mongo_url);

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
    if(err) {
        console.log('error connecting to db: '+err);
    }
});//