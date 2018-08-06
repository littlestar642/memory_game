/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

// this object is use to place the correct value of shufled classes. Also Note the code used for matching similar pairs.
let putObj = {
    1: "fa fa-diamond",
    3: "fa fa-paper-plane-o",
    5: "fa fa-bicycle",
    7: "fa fa-bolt",
    11: "fa fa-cube",
    13: "fa fa-anchor",
    17: "fa fa-leaf",
    19: "fa fa-bomb",
    2: "fa fa-diamond",
    6: "fa fa-paper-plane-o",
    10: "fa fa-bicycle",
    14: "fa fa-bolt",
    22: "fa fa-cube",
    26: "fa fa-anchor",
    34: "fa fa-leaf",
    38: "fa fa-bomb"
};
//  all the Declarations and initializations
let list = document.querySelectorAll('.deck li');
let newGame = document.querySelector('#newGame');
let newGame1 = document.querySelector('#newGame1');
let restart = document.querySelector('.restart');
let memArr = [];
let moves = 0;
let moveSelect = document.querySelector('.moves');

let modes = document.querySelector('.modes');
let noTime = document.querySelector('#noTime');
let easy = document.querySelector('#easy');
let hard = document.querySelector('#hard');
let scorePanel = document.querySelector('.score-panel');
let deck = document.querySelector('.deck');
let chooseTitle = document.querySelector('.choose-title');
let cogs = document.querySelector('#cogs');
let gameOver = document.querySelector('.gameOver');
let time = document.querySelector('.time');
let sec = document.querySelector('.countSec');

let tonoTime = document.querySelector('#tonoTime');
let toeasy = document.querySelector('#toeasy');
let tohard = document.querySelector('#tohard');
let modeinfo = document.querySelector('.modeInfo');
let easyinfo = document.querySelector('.easyInfo');
let hardinfo = document.querySelector('.hardInfo');
let timeinfo = document.querySelector('.timeInfo');
let mainTitle = document.querySelector('.mainTitle');
let endShow = document.querySelector('.endShow');
let interval;
let starcount;
let easyMode = false;

// The event listeners
tohard.addEventListener('click', () => {
    modeinfo.classList.remove('hide');
    hardinfo.classList.remove('hide');
    timeinfo.classList.add('hide');
    easyinfo.classList.add('hide');

});
tonoTime.addEventListener('click', () => {
    modeinfo.classList.remove('hide');
    timeinfo.classList.remove('hide');
    hardinfo.classList.add('hide');
    easyinfo.classList.add('hide');

});
toeasy.addEventListener('click', () => {
    modeinfo.classList.remove('hide');
    easyinfo.classList.remove('hide');
    timeinfo.classList.add('hide');
    hardinfo.classList.add('hide');
});


noTime.addEventListener('click', () => {
    modes.classList.add('hide');
    noTime.classList.add('hide');
    scorePanel.classList.remove('hide');
    deck.classList.remove('hide');
    chooseTitle.classList.add('hide')
    time.classList.add('hide');
    easyMode = false;
    moves = 0;
    sec.innerHTML = 0;
    mainTitle.classList.add('hide');
});
easy.addEventListener('click', () => {
    easy.classList.add('hide');
    modes.classList.add('hide');
    scorePanel.classList.remove('hide');
    deck.classList.remove('hide');
    chooseTitle.classList.add('hide');
    cogs.classList.add('hide');
    time.classList.remove('hide');
    clearInterval(starcount);
    // function to check time
    interval = setInterval(() => {
        sec.innerHTML = parseInt(sec.innerHTML) + 1;
        if (parseInt(sec.innerHTML) >= 60) {
            gameOver.classList.remove('hide');
            deck.classList.add('hide');
            scorePanel.classList.add('hide');
            modeinfo.classList.add('hide');
            return;
        }
    }, 1000);
    easyMode = true;
    moves = 0;
    sec.innerHTML = 0;
    mainTitle.classList.add('hide')
});
hard.addEventListener('click', () => {
    hard.classList.add('hide');
    modes.classList.add('hide');
    scorePanel.classList.remove('hide');
    deck.classList.remove('hide');
    chooseTitle.classList.add('hide');
    time.classList.remove('hide');
    mainTitle.classList.add('hide');
    cogs.classList.remove('hide');
    interval = setInterval(() => {
        sec.innerHTML = parseInt(sec.innerHTML) + 1;
        if (parseInt(sec.innerHTML) >= 60) {
            gameOver.classList.remove('hide');
            deck.classList.add('hide');
            scorePanel.classList.add('hide');
            modeinfo.classList.add('hide');
            return;
        }
    }, 1000);
    easyMode = false;
    moves = 0;
    sec.innerHTML = 0;
    mainTitle.classList.add('hide');
});

newGame.addEventListener('click', () => {
    clearInterval(interval);
    clearInterval(starcount);
    restart();
});



//  Main shuffling algorithm
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// function to create cogs
let createStar = () => {
    let i = document.createElement('i');
    i.classList.add('fa');
    i.classList.add('fa-cog');
    cogs.appendChild(i);
}
//  function to restart the Game again
let restart = function () {
    gameOver.classList.add('hide');
    easy.classList.remove('hide');
    hard.classList.remove('hide');
    noTime.classList.remove('hide');
    modes.classList.remove('hide');
    mainTitle.classList.remove('hide');
    deck.classList.add('hide');
    scorePanel.classList.add('hide');
    clearInterval(interval);
    clearInterval(starcount);
    let frg = document.createDocumentFragment();
    let array = [1, 3, 5, 7, 11, 13, 17, 19, 2, 6, 10, 14, 22, 26, 34, 38];
    array = shuffle(array);
    for (let i = 0; i < 9; i++) createStar();
    list.forEach((node, i) => {
        node.firstElementChild.className = putObj[array[i]];
        node.setAttribute('data-val', array[i]);
        node.classList.remove('open');
        node.classList.remove('match');
        node.classList.remove('show');
    });
    starcount = setInterval(() => {
        if (cogs.childElementCount === 0) {
            gameOver.classList.remove('hide');
            deck.classList.add('hide');
            scorePanel.classList.add('hide');
            modeinfo.classList.add('hide');
            return;
        };
    }, 100);
    moves = 0;
    sec.innerHTML = 0;
}
window.onload = restart;

//  Main listener that checks for cards match and mis-match
deck.addEventListener('click', (e) => {

    if (memArr.length == 2) return;
    if (e.target.nodeName == 'LI') {
        e.target.classList.add('open');
        e.target.classList.add('show');
        memArr.push(e.target.dataset.val);
        if (memArr.length === 2) {
            moveSelect.innerHTML = ++moves;
            setTimeout(() => {
                if (memArr[0] == 2 * memArr[1] || 2 * memArr[0] == memArr[1]) {
                    list.forEach(node => {
                        if (node.dataset.val == memArr[0] || (node.dataset.val) == (memArr[1])) {
                            node.classList.add('match');

                        } else {
                            node.classList.remove('show');
                            node.classList.remove('open');
                        }
                    });
                    memArr = [];
                } else {
                    if (!easyMode) {
                        cogs.firstElementChild.remove();
                    }
                    list.forEach(node => {
                        node.classList.remove('show');
                        node.classList.remove('open');
                    });
                    memArr = [];
                }
            }, 400);
        }
        let flag = 0;
        setTimeout(() => {
            list.forEach(node => {
                if (!node.classList.contains('match')) {
                    flag = 1;
                    return
                };
            })
            if (flag == 0) {
                clearInterval(interval);
                scorePanel.classList.add('hide');
                deck.classList.add('hide');
                modeinfo.classList.add('hide');
                let rating=()=>{
                    if(moves<20)return "3 star";
                    else if(moves>=20) return "2 star";
                    else return "1 star";
                };
                swal({
                    title:`Good Job! You are rated ${rating()}`,
                    text:`You are a serious player. You took ${sec.innerHTML} secs and ${moveSelect.innerHTML} moves.`,
                    type:"success",
                    confirmButtonText:"New Game",
                }).then((conf)=>{
                    if(conf){
                        restart();
                    }
                });
                memArr=[];
            };
        }, 500);
    }



})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */