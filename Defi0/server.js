var express = require('express');
var server = express();

server.get('/', function(request, response) {
 response.sendFile(__dirname + '/index.html');
});

server.listen(3000);