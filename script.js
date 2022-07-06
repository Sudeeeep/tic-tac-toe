//Game Board Module which returns gameBoard Array
const gameBoardModule = (function () {
    let gameBoard = [];

    return {
        gameBoard
    };
})();


//Display Controller Module
const displayControllerModule = (function () {
    let testDisp = () => {
        console.log("IT WORKS!!")
    };
    return {
        testDisp
    };
})();


//Factory Function to create players
function createPlayer(playerName, playerNumber, playerSymbol) {
    const getPlayer = function () {
        console.log(`Player Name:${playerName} and Player Number:${playerNumber}`)
    }
    return {
        playerName,
        playerNumber,
        getPlayer,
        playerSymbol,
    }
}



let player1 = createPlayer("Sudeep", "1", "X");
let player2 = createPlayer("Nair", "1", "O");