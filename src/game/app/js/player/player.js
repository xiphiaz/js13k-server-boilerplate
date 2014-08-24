//use the module pattern to separate code
Player = (function () {

    return function(name){
        this.name = name;
        this.socket = {};

        this.greet = function(){

            var elemDiv = document.createElement('div');
            var text = document.createTextNode(" Welcome "+name+'!');
            elemDiv.appendChild(text);
            document.body.appendChild(elemDiv);

            this.socket.emit('greet', this.name);
        };

        this.setConnection = function(socket){
            this.socket = socket;
        };



    };

})();