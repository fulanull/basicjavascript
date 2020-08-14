window.onload = function()
{
    console.log('Loaded!');
    var currentScore = 0;
    updateScore = computeScore();


    do
    {
        var choosenQuestion = chooseRandomQuestion();
        choosenQuestion.showQuestion();

        var typedAnswer;
        typedAnswer = prompt('Type the number of the correct answer!!');
        console.log(typedAnswer);

        if (typedAnswer)
        {
            currentScore =  updateScore(choosenQuestion.checkAnswer( typedAnswer) );
            console.log('\n============================================')
            console.log('Your current score is: ' + currentScore);
            console.log('============================================\n')    
        }
        
    }while(typedAnswer);

    endOfTheGame();
    

    
}



var questions = [];

function computeScore()
{
    var currentScore = 0;

    return function (isCorrect)
    {
        if(isCorrect)
        {
            ++currentScore;
        }
        return currentScore;

    }
}


var updateScore;

var Question = function (pQuestion, pPossibleAnswer, pAnswer)
{
    this.question = pQuestion;
    this.alternatives = pPossibleAnswer;
    this.answer = pAnswer;
}

Question.prototype.showQuestion = function(){
    console.log('\n\n' + this.question);
    for ( var i in this.alternatives)
    {
        console.log(i + ' - ' + this.alternatives[i]);
    }
};

Question.prototype.checkAnswer = function(chooseOne){
    console.log(chooseOne + ' |  ' + this.answer);
    if(chooseOne == this.answer)
    {
        console.log('Correct!');
        return true;
    }

    console.log('Wrong!');
    return false;
};

function chooseRandomQuestion()
{
    var qSize = questions.length;
    var randomQuestion = Math.floor( Math.random()*(qSize));
    var choosenQuestion = questions[randomQuestion];

    return choosenQuestion;

}

function endOfTheGame()
{
    var currentScore = updateScore();
    console.log('\n============================================')
    if (currentScore)
    {
        console.log('Congratulations, your score was ' + currentScore + '!' );
    }
    else
    {
        console.log('You have no score! ' );
    }
}


var aux = new Question("Whats is the first day of week?", ['Tuesday','Friday','Sunday'], 2 );
questions.push(aux);
aux = new Question("Whats is the language spoken in Brazil?", ['English','Portuguese','Spanish'], 1 );
questions.push(aux);
aux = new Question("Whats is the third month of the year?", ['March','June','September'], 0 );
questions.push(aux);

