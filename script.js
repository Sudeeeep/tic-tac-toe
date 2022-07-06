//Game Board Module which returns gameBoard Array
const gameBoardModule = (function () {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    return {
        gameBoard
    };
})();


//Display Controller Module
const displayControllerModule = (function () {
    const gridBox = document.querySelectorAll(".grid-box");
    gridBox.forEach(grid => {
        grid.addEventListener("click", renderToDisplay);
    })

    //Function to render X and O on display
    function renderToDisplay(e) {
        let index = e.target.dataset.index;

        // Restrict players from playing in spots that are already taken 
        if (gameBoardModule.gameBoard[index] == "") {

            //Check if it is Player1's turn to play
            if (player1.isPlayerActive == "true") {

                gameBoardModule.gameBoard[index] = player1.playerSymbol;
                e.target.innerText = gameBoardModule.gameBoard[index];
                console.log(gameBoardModule.gameBoard);
                player1.isPlayerActive = "false";
                player2.isPlayerActive = "true";

            }
            //Check if it is Player2's turn to play
            else if (player2.isPlayerActive == "true") {

                gameBoardModule.gameBoard[index] = player2.playerSymbol;
                e.target.innerText = gameBoardModule.gameBoard[index];
                console.log(gameBoardModule.gameBoard);
                player2.isPlayerActive = "false";
                player1.isPlayerActive = "true";
            }
        }


    };

    // return {
    //     renderToDisplay
    // };
})();


//Factory Function to create players
function createPlayer(playerName, playerNumber, playerSymbol) {
    let isPlayerActive = "";
    if (playerNumber == "1") {
        isPlayerActive = "true";
    } else {
        isPlayerActive = "false";
    }
    return {
        playerName,
        playerNumber,
        playerSymbol,
        isPlayerActive,
    }
}


let player1 = createPlayer("Sudeep", "1", "X");
let player2 = createPlayer("Nair", "2", "O");