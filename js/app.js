const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay =document.querySelector('.start');
const start = document.querySelector('.btn__reset');
const tries = document.getElementsByClassName('tries');
const unOrderedList = document.querySelector('#phrase ul');
const title = document.querySelector('h2.title');
var letterFound;
var noOfLetters = 0;
var noOfLettersShown = 0;
var missed = 0;

var phrases = ['A bird in hand',
'A strong chain',
'A diamond is forever',
'A drop in the bucket',
'A fish out of water'];

function getRandomPhraseAsArray(arr){
    let randomPhraseIndex = Math.floor(Math.random() * arr.length);
    let str = arr[randomPhraseIndex];
    let arrayOfCharacters = [];
    for(let i = 0 ; i < str.length ; i++){
        arrayOfCharacters.push(str.charAt(i));
    }
    return arrayOfCharacters;
} 
 
function addPhraseToDisplay(arr){
    for(let i = 0 ; i < arr.length ; i++){
        let li = document.createElement('li');
        li.textContent = arr[i];
        if(li.textContent !== " "){
            li.className = "letter";
            noOfLetters++;
        }else {
            li.className = "space";
        }
        unOrderedList.appendChild(li);
    }
}

function checkLetter (btn) {
    let match = " ";
    for(let i = 0 ; i < unOrderedList.children.length ; i++){
        if(unOrderedList.children[i].className === "letter"){
            if(unOrderedList.children[i].textContent.toUpperCase() === btn.textContent.toUpperCase()){
                unOrderedList.children[i].className += " show";
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
        setTimeout(function(){
            overlay.className = "win";
            overlay.style.display = "";
            title.textContent = "You Won !";
            start.textContent = "Play Again";
            start.className += " again";
        }, 1000);
    }
    else if(missed === 5){
        setTimeout(function(){
            overlay.className = "lose";
            overlay.style.display = "";
            title.textContent = "You Lose !";
            start.textContent = "Play Again";
            start.className += " again";
        }, 1000);
    }
}

start.addEventListener('click', function() {
    if(start.textContent !== "Play Again") {
        addPhraseToDisplay(getRandomPhraseAsArray(phrases));
        overlay.style.display = 'none';
    } 
    else {
        missed = 0;
        resetGame();
    }
});

qwerty.addEventListener('click', function(event) {
    if(event.target.tagName === 'button'.toUpperCase()) {
        letterFound = checkLetter(event.target);
        event.target.disabled = true;
        event.target.className = 'chosen';
        if(letterFound === null){
            tries[missed].style.display = "none";
            missed++;
            
        }
        checkWin();
    }
});




