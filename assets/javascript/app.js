$(document).ready(function () {
    /**
     * Variables
     */

    var game = {
        total: 0,
        player1: {
            wins: 0,
            gesture: "",
            history: []
        },
        player2: {
            wins: 0,
            gesture: "",
            history: []
        },
        ties: 0
    }


    /**
     * Application
     */


    /**
     * Function
     */

    // Get player action when button is clicked
    function getGesture() {
        var gesture = $(this).val();
        var playerNumber = $(this).attr("data-player");

        game["player" + playerNumber].gesture = gesture;

        // Compare when both players have selected an action
        if ((game.player1.gesture !== "") &&
            (game.player2.gesture !== "")) {
            throwGesture()
        }

        console.log(game);
    }

    function throwGesture() {
        game.total++;

        if ((game.player1.gesture === "rock" && game.player2.gesture === "scissors") ||
            (game.player1.gesture === "scissors" && game.player2.gesture === "paper") ||
            (game.player1.gesture === "paper" && game.player2.gesture === "rock")) {

            game.player1.wins++;

        }
        else if ((game.player1.gesture === "rock" && game.player2.gesture === "paper") ||
            (game.player1.gesture === "scissors" && game.player2.gesture === "rock") ||
            (game.player1.gesture === "paper" && game.player2.gesture === "scissors")) {

            game.player2.wins++;

        }
        else {
            game.ties++;
        }

        game.player1.history.push(game.player1.gesture);
        game.player2.history.push(game.player2.gesture);

        game.player1.gesture = "";
        game.player2.gesture = "";
    }


    /**
     * Events
     */

    $(document).on("click", "button", getGesture);

});