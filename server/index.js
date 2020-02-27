const webserver = require('./js/webserver');
const socket = require('./js/socket');

socket(webserver(80));
