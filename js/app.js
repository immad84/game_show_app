const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay =document.querySelector('.start');
const start = document.querySelector('.btn__reset');
const tries = document.getElementsByClassName('tries');

const unOrderedList = document.querySelector('#phrase ul');
var li = [];
var letterFound;

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
        li.push(document.createElement('li')); 
        li[i].textContent = arr[i];
        if(li[i].textContent !== " "){
            li[i].className = "letter";
        }else {
            li[i].className = "space";
        }
        unOrderedList.appendChild(li[i]);
    }
}

addPhraseToDisplay(getRandomPhraseAsArray(phrases));

function checkLetter (btn) {
    let match = " ";
    for(let i = 0 ; i < li.length ; i++){
        if(li[i].className === "letter"){
            if(li[i].textContent.toUpperCase() === btn.textContent.toUpperCase()){
                li[i].className = "show";
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

function checkWin () {
    
}



start.addEventListener('click', function() {
    overlay.style.display = 'none';
});

qwerty.addEventListener('click', function(event) {
    if(event.target.tagName === 'button'.toUpperCase()) {
        event.target.className = 'chosen';
        letterFound = checkLetter(event.target);
        if(letterFound === null){
            tries[missed].style.display = "none";
            missed++;
        }
    }
});




