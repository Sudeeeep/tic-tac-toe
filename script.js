//Game Board Module which returns gameBoard Array
const gameBoardModule = (function () {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    return {
        gameBoard
    };
})();


//Module for selecting elements from DOM
const selectElements = (function () {

    const form = document.querySelector("form");
    const playerOneName = document.querySelector('input[name="player-one-name"]');
    const playerTwoName = document.querySelector('input[name="player-two-name"]')
    const startGameBtn = document.querySelector(".start-game");
    const playerOneRadioBtn = document.querySelectorAll('input[name="player-one-choice"]')
    const playerTwoRadioBtn = document.querySelectorAll('input[name="player-two-choice"]')
    const emptyWaring = document.getElementById("empty-warning");
    const symbolWaring = document.getElementById("symbol-warning");
    const gridContainer = document.querySelector(".grid-container");
    const playerDetailsScreen = document.querySelector(".player-details-screen");
    const mainHeader = document.querySelector(".main-header");

    return {
        form,
        playerOneName,
        playerTwoName,
        startGameBtn,
        playerOneRadioBtn,
        playerTwoRadioBtn,
        emptyWaring,
        symbolWaring,
        gridContainer,
        playerDetailsScreen,
        mainHeader,
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

    selectElements.startGameBtn.addEventListener("click", validateChoice)

    // Form Validation   
    function validateChoice(e) {

        if (selectElements.playerOneName.value == "" || selectElements.playerTwoName.value == "") {

            selectElements.emptyWaring.style.display = "block"

        } else if (selectElements.playerOneRadioBtn[0].checked == selectElements.playerTwoRadioBtn[0].checked ||
            selectElements.playerOneRadioBtn[1].checked == selectElements.playerTwoRadioBtn[1].checked) {
            console.log("ERROR!");
            selectElements.symbolWaring.style.display = "block"
            selectElements.emptyWaring.style.display = "none"

        } else {
            selectElements.mainHeader.style.display = "block";
            selectElements.gridContainer.style.display = "grid";
            selectElements.playerDetailsScreen.style.display = "none"
        }
    }


    let isPlayerActive = "";
    makePlayerActive();

    // Make Player1 Active so Player1 can play first
    function makePlayerActive() {
        if (playerNumber == "1") {
            isPlayerActive = "true";
        } else {
            isPlayerActive = "false";
        }
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

// TODO: THIS WILL HELP WITH EXTRACTING PlAYER CHOICE VALUE
// playerOneRadioBtn[0].labels[0].innerText