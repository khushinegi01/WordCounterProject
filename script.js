// Word list stored in localStorage
const wordsList = [
    "apple", "banana", "grape", "orange", "pear", "peach", "cherry", "kiwi", "strawberry", "melon", "pineapple",
    "blueberry", "mango", "watermelon", "plum", "apricot", "pomegranate", "papaya", "lemon", "lime", "fig",
    "date", "blackberry", "raspberry", "applesauce", "fruit", "cantaloupe", "coconut", "nectarine", "grapefruit", 
    "jackfruit", "passionfruit", "dragonfruit", "lingonberry", "guava", "gooseberry", "kumquat", "tangerine", 
    "clementine", "lychee", "currant", "elderberry", "starfruit", "quince", "soursop", "longan", "yuzu", "mandarin","rhubarb", "jambolan", "salak", "soursop", "durian", "acai"];
// Store the words in localStorage
localStorage.setItem("words", JSON.stringify(wordsList));

let displayWords = document.querySelector("#displayWords");
let timerDisplay = document.querySelector("#timer");
let scoreDisplay = document.querySelector("#score");
let inputField = document.querySelector("#inputField");

let timer = 5;
let score = 0;
let countdownInterval;
let istyping = false;

//to display random five words from the local storage in div 
function displayRandomWords() {
    const words = JSON.parse(localStorage.getItem("words"));
    let randomWords = [];

    // Select 5 unique random words
    while (randomWords.length < 5) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        if (!randomWords.includes(word)) {
            randomWords.push(word);
        }
    }

    // Display the random words in the #displayWords div
    document.getElementById('displayWords').innerText = randomWords.join(' | ');
}

// Function to start the timer countdown
function startCountdown() {
    countdownInterval = setInterval(function() {
        if (timer > 0) {
            timerDisplay.innerText = `Timer: ${timer}`;
            timer--;
        } else {
            clearInterval(countdownInterval);
            inputField.value = '';
            displayRandomWords(); 
            resetTimer(); 
        }
    }, 1000); 
}

//counter start only if user starts typiing
function isTyping(){
    if(!istyping){
        istyping = true;
        startCountdown();
    }
}

//reset the timer to 3 
function resetTimer() {
    setTimeout(()=> {
        timer = 5;
        startCountdown(); 
    }, 1000); 
}

//to check the score 
function crossCheck() {
    if (!displayWords) {
        console.error('displayWords element not found');
        return;
    }
    const currentWords = displayWords.innerText.split(' | ').map(word => word.toLowerCase());
    const typedWord = inputField.value.trim().toLowerCase();

    if (currentWords.includes(typedWord)) {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        inputField.value = ''; // Reset the input field
    }
}

function restart(){
    location.reload();
}

window.onload = function() {
    displayRandomWords();
    
};
inputField.addEventListener('keyup',function(){
    isTyping();
    crossCheck();
});