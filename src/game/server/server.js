'use strict';

log('Hi! This is an example game!');
var Player = require('./player/player'); //you can require child js files

var io = require('sandbox-io');
log('Loaded sandbox-io', io);

io.on('connection', function(socket) {

    log.debug('New connection', socket.id);

    var player = new Player(socket);

    socket.on('disconnect', function(){
        io.emit('farewell', player.name);
    });

});