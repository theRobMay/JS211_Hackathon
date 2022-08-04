"use strict";

let targetWord = '';
let dashes = '';
let dArray = [];
let failCount = 0;

const categories = {
    NBA: ['lakers', 'warriors', 'celtics', 'raptors',
        'bulls', 'heat', 'knicks', 'mavericks', 'nets',
        'bucks', 'spurs', 'jazz', 'grizzlies', 'timberwolves',
        'kings', 'pistons', 'cavaliers','clippers', 'rockets',
        'hornets', 'thunder', 'blazers', 'hawks', 'nuggets', 'pacers',
        'pelicans', 'magic'],
    places: ['new york', 'los angeles', 'california', 'chicago', 'illinois',
        'houston', 'texas', 'philadelphia', 'pennsylvania', 'phoenix', 'arizona', 'san antonio',
        'san diego', 'dallas', 'san jose', 'austin', 'jacksonville', 'florida',
        'san francisco', 'indianapolis', 'indiana', 'massachusetts', 'mississippi'],
    movies: ["the godfather", "the shawshank redemption", "schindlers list",
        "raging bull", "casablanca", "citizen kane", "gone with the wind", "the wizard of oz",
        "inception"]
}

const hangmanPics = [
    ` 
    +---+
    |   |
        |
        |
        |
        |
  =========`,

    ` 
    +---+
    |   |
    O   |
        |
        |
        |
  =========`,

    ` 
    +---+
    |   |
    O   |
    |   |
        |
        |
  =========`,

    ` 
    +---+
    |   |
    O   |
   /|   |
        |
        |
  =========`,

    ` 
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
  =========`,

    ` 
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
  =========`,

    ` 
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  =========`]


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'guess> '
});

rl.on('line', (line) => {
    checkword(line);
}).on('close', () => {
    process.exit(0);
});

function init() {
    console.log('Welcome to the game of hangman, I am going to give you some empty dashes ' +
        'and you will guess the word in question by typing one letter or space at a time,' +
        ' try to avoid being hanged! - R');

    const options = ["NBA Teams", "Places (some cities, some states)", "Movies (Old and New)"];
    const select = options[getRandom(3)];
    targetWord = categories[select][getRandom(getRandom(categories[select].length))];
    dArray = Array(targetWord.length);
    failCount = 0;

    console.log('Category is ' + select + '\n' + dArray.join('_ ') + '_');
    rl.prompt();
}

function checkword(letter) {
    let tick;
    for (let i = 0; i < targetWord.length; i++) {
        if (targetWord[i].toLowerCase() === letter) {
            dArray[i] = targetWord[i];
            tick = true;
        } else if (dArray[i] === undefined) {
            dArray[i] = '_';
        }
    }

    tick ? tick = false : failCount++;

    if (failCount === 6) {
        console.log(hangmanPics[failCount]);
        console.log('Game over, you are hanged');
        console.log('Word is ', targetWord);
        init();
        return;
    } else {
        console.log(hangmanPics[failCount]);
    }
    dArray.includes('_') ? rl.prompt() : console.log('You have won, you won! yea');
    console.log(dArray.join(' '));
}

//for getting random things
function getRandom(max) {
    return Math.floor(Math.random() * (max));
}

init();