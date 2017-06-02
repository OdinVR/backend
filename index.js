/*
* OdinVR Web Server
* 
* Andrew Arpasi June 2017
*/


mongoose = require('mongoose'),
multer = require('multer'),
unzip = require('unzip'),
s3fs = require('s3fs'),

routes = require('./routes/routes.js');