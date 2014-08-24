'use strict';

var Player = (function () {

    return function(socket){

        var thisPlayer = this;
        this.name = false;

        this.socket = socket;

        this.socket.on('greet', function(name){
            log.debug('greet', name);
            socket.broadcast.emit('greet', name);

            thisPlayer.name = name;
        });

    };

})();

module.exports = Player;