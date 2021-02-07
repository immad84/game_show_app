const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.querySelector('.start');
const start = document.querySelector('.btn__reset');
const tries = document.getElementsByClassName('tries');
const unOrderedList = document.querySelector('#phrase ul');
const title = document.querySelector('h2.title');
var letterFound;
var noOfLetters = 0;
var noOfLettersShown = 0;
var missed = 0;

var phrases = ['Better late than never',
'Call it a day',
'A diamond is forever',
'Break a leg',
'Cut somebody some slack',
'Get your act together'];

let getRandomPhraseAsArray = arr => {
    let randomPhraseIndex = Math.floor(Math.random() * arr.length);
    let str = arr[randomPhraseIndex];
    let arrayOfCharacters = [];
    for(let i = 0 ; i < str.length ; i++){
        arrayOfCharacters.push(str.charAt(i));
    }
    console.log(arrayOfCharacters);
    return arrayOfCharacters;
} 
 
function addPhraseToDisplay(arr){
    for(let i = 0 ; i < arr.length ; i++){
        let li = document.createElement('li');
        li.textContent = arr[i];
        if(li.textContent === " "){
            li.className = "space";
        }else {
            li.className = "letter";
            noOfLetters++;
        }
        unOrderedList.appendChild(li);
    }
}

function checkLetter (btn) {
    let match = null;
    let lis = unOrderedList.children;
    for(let i = 0 ; i < lis.length ; i++){
        if(lis[i].className === "letter"){
            if(lis[i].textContent.toUpperCase() === btn.textContent.toUpperCase()){
                lis[i].className += " show";
                noOfLettersShown++;
                match = btn.textContent;
            }
        }
    }
    if(match === " "){
        match = null;
        return match;
    }else {
        return match;
    }
}

function resetGame () {
    const btn = document.querySelectorAll(".keyrow button");
    unOrderedList.innerHTML = "";
    for(let i = 0 ; i < btn.length ; i++){
        btn[i].classList.remove('chosen');
        btn[i].disabled = false;
    }
    for(let i = 0 ; i < tries.length ; i++){
        tries[i].style.display = "";
    }
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    overlay.style.display = 'none';
}

function checkWin () {
    if(noOfLettersShown === noOfLetters){
        overlay.className = "win";
        overlay.style.display = "";
        title.textContent = "You Won !";
        start.textContent = "Play Again";
        start.className += " again";
    }
    else if(missed > 4){
        overlay.className = "lose";
        overlay.style.display = "";
        title.textContent = "You Lose !";
        start.textContent = "Play Again";
        start.className += " again";
    }
}

start.addEventListener('click', function() {
    if(start.textContent === "Start Game") {
        addPhraseToDisplay(getRandomPhraseAsArray(phrases));
        overlay.style.display = 'none';
    } 
    else {
        missed = 0;
        resetGame();
    }
});

qwerty.addEventListener('click', function(event) {
    let btn = event.target;
    if(btn.tagName === 'button'.toUpperCase()) {
        letterFound = checkLetter(btn);
        btn.disabled = true;
        btn.className = 'chosen';
        if(letterFound === null){
            tries[missed].style.display = "none";
            missed++; 
        }
        checkWin();
    }
});




