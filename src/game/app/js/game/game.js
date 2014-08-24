//use the module pattern to separate code
GameRunner = (function () {


    var onGreet = function(name){

        var elemDiv = document.createElement('div');
        var text = document.createTextNode(name + " just joined the game, Hello!");
        elemDiv.appendChild(text);
        document.body.appendChild(elemDiv);

    };

    var onFarewell = function(name){

        var elemDiv = document.createElement('div');
        var text = document.createTextNode(name + " just left the game, Goodbye!");
        elemDiv.appendChild(text);
        document.body.appendChild(elemDiv);

    };

    return function(){

        this.player = null;
        this.socket = {};

        this.setPlayer = function(Player){
            this.player = Player;
            return this; //for chaining
        };

        this.connect = function(socket){

            if (!this.socket.connected){
                console.log('connecting');
                this.socket = socket;
            }

            this.player.setConnection(this.socket);

            this.socket.on('greet', onGreet);
            this.socket.on('farewell', onFarewell);

            return this;
        };

        this.start = function(){

            this.player.greet();

        };

    };

})();