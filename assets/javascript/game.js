var lettersPressed = [];
var answerLetters = [];
var guessWrong = 0;
var maxGuesses = 7;
var winCount = 0;
var lossCount = 0;
var wordBank = ["Algebra", "Poodle", "Citizen", "Pizzaz", "Cooperate", "Munchkin", "Flower", "Supercalifragilisticexpialidocious"];

//Pull from wordBank to give puzzle word
function initializeGame() {
    var gameWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    var answerContainer = document.getElementById('answer');
    answerContainer.innerHTML = "";
    for (var i = 0; i < gameWord.length; i++) {
        var letter = gameWord[i];
        var upperLetter = letter.toUpperCase(); 
        answerLetters[upperLetter] = true;  //making sure all cases of letter work
        var letterDiv = document.createElement('div');
        letterDiv.classList.add(['letter-container'])
        letterDiv.classList.add(['p-3'])
        var letterSpan = document.createElement('span');
        letterSpan.setAttribute('name', upperLetter);
        letterSpan.innerHTML = letter;
        letterSpan.classList.add(['hide-letter']);  //using class to hide display of letters
        var underscoreSpan = document.createElement('span');
        underscoreSpan.innerHTML = '_'; //creating "_" to display under letters
        underscoreSpan.classList.add(['under-letter'])
        letterDiv.appendChild(letterSpan);
        letterDiv.appendChild(underscoreSpan);
        answerContainer.appendChild(letterDiv);
    }
}

initializeGame();


// Variables to create multiple buttons on screen
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var btnContainer = document.getElementById("buttons");

//Function to create buttons
function createButtons() {
    for (var i = 0; i < letters.length; i++) {
        var currentLetter = letters[i];
        var letterBtn = document.createElement('button');
        letterBtn.classList.add('letter-button');
        letterBtn.classList.add('btn');
        letterBtn.classList.add('btn-outline-info');
        letterBtn.innerHTML = currentLetter;
        letterBtn.value = currentLetter;
        letterBtn.addEventListener("click", guessLetter);
        btnContainer.appendChild(letterBtn);
    }
}

createButtons();


//Create the onClick functions for the letters
function guessLetter(ev) {
    console.log(this.value);
    this.setAttribute('disabled', true);
    //If value returns true
    if (answerLetters[this.value]) {
        console.log('right');
        answerLetters[this.value] = false;
        var letterSpans = document.querySelectorAll('[name="'+this.value+'"]');
        for (var i = 0; i < letterSpans.length; i++) {
            letterSpans[i].classList.remove('hide-letter');
        }
    }
    //If value returns false
    else {
        console.log('wrong');
        guessWrong++;
    }
    checkGameStatus();
}

//Determine if game is over
function checkGameStatus() {
    var gameWon = true;
    var answerKeys = Object.keys(answerLetters);
    for (var i = 0; i < answerKeys.length; i++) {
        if (answerLetters[answerKeys[i]]) {
            gameWon = false; 
            break;
        }
    }
    //I word is completed
    if (gameWon) {
        var winner = document.getElementById('winner');
            winner.style.display= "block";
    }
    //If user runs out of guess
    else if (guessWrong == maxGuesses) {
        var loser = document.getElementById('loser');
            loser.style.display= "block";
    }
    var gameLost = true;
}
    
