//Game Board Module which returns gameBoard Array
const gameBoardModule = (function () {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    return {
        gameBoard
    };
})();


//Module for selecting elements from DOM
const selectElementsModule = (function () {

    const form = document.querySelector("form");
    const playerOneName = document.querySelector('input[name="player-one-name"]');
    const playerTwoName = document.querySelector('input[name="player-two-name"]')
    const startGameBtn = document.querySelector(".start-game");
    const playerOneRadioBtn = document.querySelectorAll('input[name="player-one-choice"]')
    const playerTwoRadioBtn = document.querySelectorAll('input[name="player-two-choice"]')
    const emptyWaring = document.getElementById("empty-warning");
    const symbolWaring = document.getElementById("symbol-warning");
    const gridContainer = document.querySelector(".grid-container");
    const gridBox = document.querySelectorAll(".grid-box");
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
        gridBox,
        playerDetailsScreen,
        mainHeader,
    };
})();


// Module to values in form entered by user
const validateModule = (function () {

    selectElementsModule.startGameBtn.addEventListener("click", validateChoice)

    // Form Validation   
    function validateChoice() {

        if (selectElementsModule.playerOneName.value == "" || selectElementsModule.playerTwoName.value == "") {

            selectElementsModule.emptyWaring.style.display = "block"

        } else if (selectElementsModule.playerOneRadioBtn[0].checked == selectElementsModule.playerTwoRadioBtn[0].checked ||
            selectElementsModule.playerOneRadioBtn[1].checked == selectElementsModule.playerTwoRadioBtn[1].checked) {

            selectElementsModule.symbolWaring.style.display = "block"
            selectElementsModule.emptyWaring.style.display = "none"

        } else {
            selectElementsModule.mainHeader.style.display = "block";
            selectElementsModule.gridContainer.style.display = "grid";
            selectElementsModule.playerDetailsScreen.style.display = "none"
        }
    }

})();


//Display Controller Module
const displayControllerModule = (function () {

    let player1;
    let player2;
    selectElementsModule.startGameBtn.addEventListener("click", playerValues);

    //Function to take user input and create player object with the input
    function playerValues() {
        let playerOneName = selectElementsModule.playerOneName.value;
        let playerTwoName = selectElementsModule.playerTwoName.value;
        let playerOneChoice = "";
        let playerTwoChoice = "";

        //Check which symbols players have selected
        selectElementsModule.playerOneRadioBtn[0].checked ? playerOneChoice = selectElementsModule.playerOneRadioBtn[0].labels[0].innerText : playerOneChoice = selectElementsModule.playerOneRadioBtn[1].labels[0].innerText;
        selectElementsModule.playerTwoRadioBtn[0].checked ? playerTwoChoice = selectElementsModule.playerTwoRadioBtn[0].labels[0].innerText : playerTwoChoice = selectElementsModule.playerTwoRadioBtn[1].labels[0].innerText;

        //create player objects
        player1 = createPlayer(playerOneName, "1", playerOneChoice);
        player2 = createPlayer(playerTwoName, "2", playerTwoChoice);

        //mark 'X' or 'O' when each grid is clicked
        selectElementsModule.gridBox.forEach(grid => {
            grid.addEventListener("click", renderToDisplay);
        })

        return {
            player1,
            player2
        }

    }

    //Function to render X and O on display
    function renderToDisplay(e) {

        //get index of each box
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
})();



//Factory Function to create players
function createPlayer(playerName, playerNumber, playerSymbol) {

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