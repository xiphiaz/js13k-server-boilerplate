//use the module pattern to separate code
GameRunner = (function () {

    var players = [];

    return function(){

        this.addPlayer = function(Player){
            players.push(Player);
            return this; //for chaining
        };

        this.start = function(){

            for (var i=0; i<players.length;i++){
                players[i].greet();
            }

        };

    };

})();