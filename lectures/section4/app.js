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
    dice_0_DOM = document.getElementById("dice-0");
    dice_1_DOM = document.getElementById("dice-1");
    dice_0_DOM.style.display = 'none';
    dice_1_DOM.style.display = 'none';
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
var gamePlaying;
var targetValue;
var dice_0_DOM;
var dice_1_DOM;



//Reset
function newGame()
{
    // console.log('New clicked!!!');
    activePlayer = 0;
    currentScore = 0;
    gamePlaying = true;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

    var targetValueDOM = document.getElementById('targetPoint').value;

    if( targetValueDOM>0 && targetValueDOM <=200)
    {
        targetValue = targetValueDOM;
    }
    else
    {
        targetValue = 20 ;
    }

    console.log('Target Value: ' + targetValue);

    for (i in players)
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
    
    for (i in players )
    {        
        // players[i].debug();
        document.getElementById('name-' + i ).textContent = players[i].name;
        players[i].reset();
    }
    otherPlayerTurn();
    otherPlayerTurn();
}


function updateCurrent()
{
    // console.log('Active: ' + activePlayer);
    var currentMark = '#current-'+activePlayer;
    document.querySelector(currentMark).textContent = currentScore;

}

function hold()
{
    if (gamePlaying )
    {
        players[activePlayer].hold(currentScore);   
        otherPlayerTurn();        
    }
}

function otherPlayerTurn()
{   
    if( currentScore === 0 )
    {
        //players[activePlayer].reset();
    }
    currentScore = 0;
    updateCurrent();
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    // document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer = (activePlayer + 1) % 2;
    // document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    currentScore = 0;
    updateCurrent();
}

function winner()
{
    players[activePlayer].hold(currentScore);
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');    
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');    
    // console.log('Winner ' + activePlayer + '!!!!!!!1' );
    document.getElementById('name-' + activePlayer ).textContent = 'Winner!';
    //players[activePlayer].
}

function rollDice()
{
    if (gamePlaying )
    {
            //generate random number
        dice_0_DOM.style.display = "";
        var numberRolled0 = Math.floor( 6*Math.random()) + 1;
        //update dice image
        var imgName='dice-' + numberRolled0 + '.png';
        dice_0_DOM.src = imgName;

        dice_1_DOM.style.display = "";
        var numberRolled1 = Math.floor( 6*Math.random()) + 1;
        //update dice image
        var imgName='dice-' + numberRolled1 + '.png';
        dice_1_DOM.src = imgName;

        if(numberRolled0 === 1 || numberRolled1 === 1)
        {
            currentScore = 0;
            numberRolled0 = 0;
            numberRolled1 = 0;
            // console.log('Sorteou 1!!!');
        }
        currentScore += numberRolled0 + numberRolled1;
        updateCurrent();

        if ( (players[activePlayer].score + currentScore) >= targetValue )
        {
            winner();
            gamePlaying = false;
        }

        if( currentScore === 0 )
        {
            otherPlayerTurn();
        }

        // console.log('-> ' + numberRolled + ' => ' + imgName);
        // console.log(dice);
    }
}

//*/
