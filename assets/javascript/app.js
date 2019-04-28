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
        gesture: "",
        history: []
    }
    var player2 = {
        wins: 0,
        gesture: "",
        history: []
    }
    var ties = 0;
    var gestureImages = {
        player1: {
            rock: "assets/images/rock_formatted_1.png",
            paper: "assets/images/paper_formatted_1.png",
            scissors: "assets/images/scissors_formatted_1.png"
        },
        player2: {
            rock: "assets/images/rock_formatted_2.png",
            paper: "assets/images/paper_formatted_2.png",
            scissors: "assets/images/scissors_formatted_2.png"
        },
    }


    /**
     * Application
     */

    // createInstance(); 


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
            throwGesture();
        }
    }



    /**
     * function updateGesture()
     * Updates gesture in Firebase
     */

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

        player1.history.push(player1.gesture);
        player2.history.push(player2.gesture);

        updateDisplay();
        calculateRecord();

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

    function calculateRecord() {
        var lossesP1 = total - ties - player1.wins;
        var lossesP2 = total - ties - player2.wins;

        console.log(total + " total games");
        console.log("Player 1 (" + player1.wins + "-" + lossesP1 + "-" + ties + ")");
        console.log("Player 2 (" + player2.wins + "-" + lossesP2 + "-" + ties + ")");
    }


    /**
     * function displayGestures()
     * Updates the display for each player
     */

    function updateDisplay() {
        createSpan("#player-1-wins", player1.wins);
        createSpan("#player-2-wins", player2.wins);
        createSpan("#ties", ties);

        if (player1.gesture === "paper") {
            updateImage(1, player1.gesture, gestureImages.player1.paper);
        }
        else if (player1.gesture === "scissors") {
            updateImage(1, player1.gesture, gestureImages.player1.scissors);
        }
        else {
            updateImage(1, player1.gesture, gestureImages.player1.rock);
        }

        if (player2.gesture === "paper") {
            updateImage(2, player2.gesture, gestureImages.player2.paper);
        }
        else if (player2.gesture === "scissors") {
            updateImage(2, player2.gesture, gestureImages.player2.scissors);
        }
        else {
            updateImage(2, player2.gesture, gestureImages.player2.rock);
        }

        updateRounds();
    }

    /**
     * function updateRounds()
     * Updates the display with previous round's results - up to 3 previous rounds
     */

    function updateRounds() {
        var round = total;
        var i;
        var j = 3;
        var k = round - 1;
        var div = $("<div>");

        if (round < 3) {
            j = round;
        }

        // If only 1 loop, should avoid
        for (i = 0; i < j; i++) {
            var p = $("<p>");

            p.text(player1.history[k] + " " + round + " " + player2.history[k]);
            div.append(p);

            k--;
            round--;
        }

        $("#rounds").html(div);
    }

    /**
     * function createSpan()
     * Creates span element for wins and ties
     */

    function createSpan(id, record) {
        var span = $("<span>");

        span.text(record);

        $(id).html(span);
    }

    /**
     * function updateImage()
     * Updates the gesture image for each player
     */
    
    function updateImage(playerNumber, gesture, imageUrl) {
        var img = $("<img>");

        img.attr("src", imageUrl)
            .attr("alt", gesture);

        $("#player-" + playerNumber + "-gesture-img").html(img);
    }

    /**
     * function createInstance()
     * Creates a new instance of the game - not ready to be used
     */

    function createInstance() {
        // database.ref("app/instance/").push({
        // });
        var key = database.ref("app/instance/").push({
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
        }).key;
        // console.log(key);
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
                gesture: "",
                history: []
            },
            player2: {
                wins: 0,
                gesture: "",
                history: []
            },
            ties: 0
        });

        updateDisplay();
        calculateRecord();
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

        // If history does not exist, reset player#.history to avoid changing type
        if ((player1.history == null) ||
            (player2.history == null)) {

            player1.history = [];
            player2.history = [];
        }

        // Update the display with data from Firebase when the page is loaded
        if (initialize === true) {
            // player1.history = [];
            // player2.history = [];

            updateDisplay();
            calculateRecord();

            initialize = false;
        }
    });
});

