# RPS-Multiplayer
An online multiplayer Rock Paper Scissors game.

# Rock Paper Scissors

# Screenshots

# What's New
* Local game play
* Online game play
* Track losses
* Update display

# Instructions
Launch this game in browser and pick a seat (left and right). Each player's gesture selection can be changed until both players select a gesture. After both players have selected a gesture, they will throw, and a winner will be decided. Wins and ties are updated in the display, but losses are also calculated (they will appear in the console, but not in the display, to reduce redundancy). 

A hard reset button is included in game, which can be used if the game is out of sync - a scenario caused by one player selecting a gesture, but the other player leaves the game. When the game is re-launched, the first player's gesture is loaded into the game.


# Issues ([Feature], [Bug])
[Bug] Gestures get out of sync when app is closed and one player has logged a gesture, on page load image will be updated to the stored gesture - only solutions are to reset the game or burn the round

[Feature] Add game instancing - multiple instances of games can exist. Users start a new game which returns a game id (from Firebase). This id can be shared with another user. 

[Feature] Seating for users so that gestures only display on for the seated user.

[Feature] In-game messaging.

[Feature] Gesture animations.

# References