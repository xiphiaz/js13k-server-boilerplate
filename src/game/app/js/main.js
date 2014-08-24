/**
 * main.js This file will always be included last so submodules are available.
 */
(function(window, GameRunner, Player){

    new GameRunner()
        .addPlayer(new Player('Lannister'))
        .addPlayer(new Player('Targaryen'))
        .start()
    ;

})(window, GameRunner, Player);