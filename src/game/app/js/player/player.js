//use the module pattern to separate code
Player = (function () {

    return function(name){
        this.name = name;

        this.greet = function(){
            console.log("Hello " + this.name);
        };

    };

})();