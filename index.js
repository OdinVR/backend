/*
* OdinVR Web Server
* 
* Andrew Arpasi June 2017
*/


require('./routes/routes.js');

require('./db.js');

const sockets = require('./sockets');
sockets.startSockets();