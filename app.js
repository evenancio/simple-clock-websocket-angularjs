var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

var server = http.createServer(app);
var SocketIO = require('socket.io');
var io = SocketIO.listen(server);

var timeHistory = [];

setInterval(function(){
    timeHistory.unshift(new Date().toJSON());
    io.sockets.emit('time', {time: timeHistory});
}, 1000);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

server.listen(3333);