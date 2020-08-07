/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

window.onload = function()
{
    console.log('Loaded!');
    document.querySelector(".dice").style.display = 'none';
    players = [ getPlayer("Igor", document.querySelector("#score-0") ),
                getPlayer("Souza", document.querySelector("#score-1") ) ];

    newGame();
    
}


function getPlayer(pName, score)
{
    var player = {
        name:pName,
        score:0,
        pScore: score,
        hold: function( current )
            {
                this.score += current;
                this.updateScreen();
            },
        reset: function()
            {
                this.score = 0;
                this.updateScreen();
            },
        updateScreen: function() { this.pScore.textContent = this.score; },
        debug: function () { console.log(this.name + ' ==>' + ' Score: ' + this.score ) },
    }

    return player;
}


var players;
var activePlayer ;
var currentScore ;
var pCurrent;



//Reset
function newGame()
{
    console.log('New clicked!!!');
    activePlayer = 0;
    currentScore = 0;
    for (i in players )
    {        
        // players[i].debug();
        players[i].reset();
    }
    otherPlayerTurn();
    otherPlayerTurn();
}


function refreshVariablesScreen()
{


}

function updateCurrent()
{
    console.log('Active: ' + activePlayer);
    var currentMark = '#current-'+activePlayer;
    document.querySelector(currentMark).textContent = currentScore;

}

function hold()
{
    players[activePlayer].hold(currentScore);   
    otherPlayerTurn();
}

function otherPlayerTurn()
{   
    if( currentScore === 0 )
    {
        players[activePlayer].reset();
    }
    updateCurrent();
    activePlayer = (activePlayer + 1) % 2;
    updateCurrent();
    currentScore = 0;
}

function rollDice()
{
    //generate random number
    document.querySelector(".dice").style.display = "";
    var numberRolled = Math.floor( 6*Math.random()) + 1;
    //update dice image
    var imgName='dice-' + numberRolled + '.png';
    var dice = document.querySelector(".dice");
    dice.src = imgName;

    if(numberRolled === 1 )
    {
        currentScore = 0;
        numberRolled = 0;
        // console.log('Sorteou 1!!!');
    }
    currentScore += numberRolled;
    updateCurrent();

    if( currentScore === 0 )
    {
        otherPlayerTurn();
    }

    // console.log('-> ' + numberRolled + ' => ' + imgName);
    // console.log(dice);
}


