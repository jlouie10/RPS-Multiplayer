$(document).ready(function () {

    /**
     * Initialize Firebase
     */

    var config = {
        apiKey: "AIzaSyDdNeulUrEPxPIcg8Lf1l-fob7Ua1Ewkr4",
        authDomain: "rps-multiplayer-7d9b0.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-7d9b0.firebaseio.com",
        projectId: "rps-multiplayer-7d9b0",
        storageBucket: "rps-multiplayer-7d9b0.appspot.com",
        messagingSenderId: "467435142902"
    };

    firebase.initializeApp(config);

    var database = firebase.database();


    /**
     * Variables
     */

    var initialize = true;
    var total = 0;
    var player1 = {
        wins: 0,
        gesture: ""
    }
    var player2 = {
        wins: 0,
        gesture: ""
    }
    var ties = 0;


    /**
     * Application
     */




    /**
     * function getGesture()
     * Get player gesture when button is clicked
     */

    function getGesture() {
        var playerNumber = $(this).attr("data-player");
        var playerGesture = $(this).val();

        if (playerNumber === "1") {
            updateGesture(player1, playerNumber, playerGesture);
        }
        else {
            updateGesture(player2, playerNumber, playerGesture);
        }

        // Compare when both players have selected an action
        if ((player1.gesture !== "") &&
            (player2.gesture !== "")) {
            throwGesture()
        }
    }


    function updateGesture(player, number, gesture) {
        player.gesture = gesture;

        database.ref("app/player" + number + "/").set(player);
    }


    /**
     * function throwGesture()
     * Determine RPS winner
     */

    function throwGesture() {
        total++;

        if ((player1.gesture === "rock" && player2.gesture === "scissors") ||
            (player1.gesture === "scissors" && player2.gesture === "paper") ||
            (player1.gesture === "paper" && player2.gesture === "rock")) {

            player1.wins++;

        }
        else if (player1.gesture === player2.gesture) {
            ties++;
        }
        else {
            player2.wins++;
        }

        losses = calculateLosses();

        updateDisplay(losses);

        player1.gesture = "";
        player2.gesture = "";

        updateApp();
    }

    /**
     * function updateApp()
     * Update Firebase
     */

    function updateApp() {
        database.ref("app/").set({
            total: total,
            player1: player1,
            player2: player2,
            ties: ties
        });
    }

    /**
     * function calculateLosses()
     * Calculate losses for each player
     */

     function calculateLosses() {
         var lossesP1 = total - ties - player1.wins;
         var lossesP2 = total - ties - player2.wins;

         return [lossesP1, lossesP2];
     }


     /**
     * function displayGestures()
     * Updates the display for each player
     */

    function updateDisplay(lossesArray) {
        var summaryP1 = "Player 1: " + player1.wins + "-" + lossesArray[0] + "-" + ties;
        var summaryP2 = "Player 2: " + player2.wins + "-" + lossesArray[1] + "-" + ties;
        var span1 = $("<span>");
        var span2 = $("<span>");
        var span3 = $("<span>");

        span1.text(player1.wins);
        span2.text(player2.wins);
        span3.text(ties);

        $("#player-1-wins").html(span1);
        $("#player-2-wins").html(span2);
        $("#ties").html(span3);

        $("#summary").text(summaryP1)
            .append(summaryP2);
        
        $("#player-1-gesture").text(player1.gesture);
        $("#player-2-gesture").text(player2.gesture);
    }


    /**
     * fundction reset()
     * Initializes database
     */

    function reset() {
        database.ref("app/").set({
            total: 0,
            player1: {
                wins: 0,
                gesture: ""
            },
            player2: {
                wins: 0,
                gesture: ""
            },
            ties: 0
        });
    }


    /**
     * Events
     */

    $(document).on("click", ".gesture", getGesture);
    $(document).on("click", "#reset", reset);

    database.ref().on("value", function (data) {
        var app = data.val().app;
        
        total = app.total;
        player1 = app.player1;
        player2 = app.player2;
        ties = app.ties;

        if (initialize === true) {
            updateDisplay(0);
            
            initialize = false;
        }
    });
});

