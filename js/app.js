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

var time = 0;
var putObj = {
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

var list = document.querySelectorAll('.deck li');
var newGame = document.querySelector('#newGame');
var newGame1 = document.querySelector('#newGame1');
var restart = document.querySelector('.restart');
var memArr = [];
var moves = 0;
var moveSelect = document.querySelector('.moves');

var modes = document.querySelector('.modes');
var noTime = document.querySelector('#noTime');
var easy = document.querySelector('#easy');
var hard = document.querySelector('#hard');
var scorePanel = document.querySelector('.score-panel');
var deck = document.querySelector('.deck');
var chooseTitle = document.querySelector('.choose-title');
var stars = document.querySelector('#stars');
var gameOver = document.querySelector('.gameOver');
var time = document.querySelector('.time');
var sec = document.querySelector('.countSec');

var tonoTime = document.querySelector('#tonoTime');
var toeasy = document.querySelector('#toeasy');
var tohard = document.querySelector('#tohard');
var modeinfo = document.querySelector('.modeInfo');
var easyinfo = document.querySelector('.easyInfo');
var hardinfo = document.querySelector('.hardInfo');
var timeinfo = document.querySelector('.timeInfo');
var mainTitle = document.querySelector('.mainTitle');
var endShow = document.querySelector('.endShow');
var interval;
var starcount;
var easyMode = false;


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
    stars.classList.add('hide');
    time.classList.remove('hide');
    clearInterval(starcount);
    interval = setInterval(() => {
        sec.innerHTML = parseInt(sec.innerHTML) + 1;
        if (parseInt(sec.innerHTML) >= 60) {
            gameOver.classList.remove('hide');
            deck.classList.add('hide');
            scorePanel.classList.add('hide');
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
    start.classList.remove('hide');
    time.classList.remove('hide');
    interval = setInterval(() => {
        sec.innerHTML = parseInt(sec.innerHTML) + 1;
        if (parseInt(sec.innerHTML) >= 60) {
            gameOver.classList.remove('hide');
            deck.classList.add('hide');
            scorePanel.classList.add('hide');
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
newGame1.addEventListener('click', () => {
    clearInterval(interval);
    clearInterval(starcount);
    restart();
});



function shuffle(array) {
    var currentIndex = array.length,
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

// restart.addEventListener('click', () => {
//     clearInterval(interval);
//     clearInterval(starcount);
//     restart();
// });
var createStar = () => {
    var i = document.createElement('i');
    i.classList.add('fa');
    i.classList.add('fa-star');
    stars.appendChild(i);
}
var restart = function () {
    gameOver.classList.add('hide');
    easy.classList.remove('hide');
    hard.classList.remove('hide');
    noTime.classList.remove('hide');
    modes.classList.remove('hide');
    mainTitle.classList.remove('hide');
    var frg = document.createDocumentFragment();
    var array = [1, 3, 5, 7, 11, 13, 17, 19, 2, 6, 10, 14, 22, 26, 34, 38];
    array = shuffle(array);
    for (var i = 0; i < 8; i++) createStar();
    console.log(array);
    list.forEach((node, i) => {
        node.firstElementChild.className = putObj[array[i]];
        node.setAttribute('data-val', array[i]);
        node.classList.remove('open');
        node.classList.remove('match');
        node.classList.remove('show');
        console.log(node);
    });
    starcount = setInterval(() => {
        if (stars.childElementCount === 0) {
            gameOver.classList.remove('hide');
            deck.classList.add('hide');
            scorePanel.classList.add('hide');
            return;
        };
    }, 100);
    moves = 0;
    sec.innerHTML = 0;
}
window.onload = restart;

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
                        stars.firstElementChild.remove();
                    }
                    list.forEach(node => {
                        node.classList.remove('show');
                        node.classList.remove('open');
                    });
                    memArr = [];
                }
            }, 400);
        }
        var flag = 0;
        setTimeout(() => {
            list.forEach(node => {
                if (!node.classList.contains('match')) {
                    flag = 1;
                    return
                };
            })
            if (flag == 0) {
                modeinfo.classList.add('hide');
                endShow.classList.remove('hide');
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