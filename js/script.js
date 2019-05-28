//to fetch out the main element to apply the game logic//
"use strict";
const cards = document.querySelector(".parent-box");
cards.addEventListener("click", matchingGame);
let oldEventTarget = null;
let moves = 0;
let startTime = 0;
let wrongMoves = 0;
let correctMoves = 0;
let timer;

//create array with object and its property.
let box_Cards = [{value:"A",hash_key:"&#128036"},{value:"D",hash_key:"&#128123"},{value:"E",hash_key:"&#128053"},{value:"G",hash_key:"&#128032"},{value:"H",hash_key:"&#128151"},{value:"F",hash_key:"&#127773"},{value:"C",hash_key:"&#128021"},{value:"B",hash_key:"&#129409"},{value:"D",hash_key:"&#128123"},{value:"C",hash_key:"&#128021"},{value:"F",hash_key:"&#127773"},{value:"G",hash_key:"&#128032"},{value:"A",hash_key:"&#128036"},{value:"B",hash_key:"&#129409"},{value:"E",hash_key:"&#128053"},{value:"H",hash_key:"&#128151"}];

//calling createBoxCards function to create cards and its items.
createBoxCards();

const time = document.querySelector(".timer");
const movesCount = document.querySelector(".moves-count");
let boxItems;
let boxCards;
toCreateBoxCardsAndItems();


//to match the cards by if conditions//
function matchingGame(event) {
    let fetchTarget = event.target;
    let gettingClassOfParentBox = fetchTarget.className;
    let isClicked = fetchTarget.getAttribute("clicked");

    if (isClicked === "false" && gettingClassOfParentBox === "box-cards") {
        fetchTarget.setAttribute("clicked", true);
        let displayElement = $(fetchTarget);
        let showCard = displayElement.find("span");
        showCard.css("display", "block");
        moves = moves + 1;
        numberofMoves(moves);
        if (oldEventTarget !== null) {
            let oldValue = oldEventTarget.getAttribute("value");
            let newValue = fetchTarget.getAttribute("value");
            if (oldValue === newValue) {
                oldEventTarget.style.background = "#81ecec";
                fetchTarget.style.background = "#81ecec";

                oldEventTarget = null;
                correctMoves = correctMoves + 1;
                console.log("you won");
                if (correctMoves === 8) {
                    congratsUser();
                }
            } else {
                hideCards(500);
                correctMoves = 0;
                starRating(wrongMoves);
                boxCards = $(boxCards);
                boxCards.css("background", "#2e3d49");
                oldEventTarget = null;
                console.log("you loss");
                makeAllCardsClickableAgain();
            }
        } else {
            oldEventTarget = fetchTarget;
            fetchTarget.style.background = "#fab1a0";
        }
    }
}


//to hide the clicked cards//
function hideCards(time) {
    setTimeout(function() {
        for (let i = 0; i < boxItems.length; i++) {
            let singleHideItem = boxItems[i];
            singleHideItem.style.display = "none";

        }
    }, time);

}


// function to make the clicked cards clickable again//
function makeAllCardsClickableAgain() {
    for (let j = 0; j < boxCards.length; j++) {
        let newCardItem = boxCards[j];
        newCardItem.setAttribute("clicked", false);
    }
}


//function to count number of moves as per the click.//
function numberofMoves(moves) {
    movesCount.innerHTML = moves;
    if (moves === 1) {
        startTime = new Date();
        time.style.display = "block";
        myTimer();
    }
}


//to find out the reset element and add a event listener to it.//
let newStart = document.querySelector(".fa-repeat");
newStart.addEventListener("click", freshBegin);
//restart element is Clicked//
function freshBegin() {
    createBoxCards();
    toCreateBoxCardsAndItems();
    hideCards(200);
    correctMoves = 0;
    moves = 0;
    numberofMoves(0);
    clearInterval(timer);
    time.innerHTML = 0;
    starRating(-1);
    boxCards = $(boxCards);
    boxCards.css("background", "#2e3d49");
}


//when user starts the game, timer will start//
function myTimer() {
    var setTimer = function() {
        var date = new Date();
        var timeUsed = date.getTime() - startTime.getTime();
        timeUsed = msToTime(timeUsed);
        time.innerHTML = timeUsed;

    }
    timer = setInterval(setTimer, 1000);
}


//function to conver from millisecond to time format//
function msToTime(duration) {
    var seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

//star rating function-- reducting the star rating as per the wrong moves//
function starRating(wrgMoves) {
    wrongMoves = wrgMoves + 1;
    if (wrongMoves === 0) {
        let starHide2 = document.querySelector("#star2");
        starHide2.style.display = "inline-block";
        let starHide3 = document.querySelector("#star3");
        starHide3.style.display = "inline-block";
    } else if (wrongMoves === 2) {
        let starHide3 = document.querySelector("#star3");
        starHide3.style.display = "none";
    } else if (wrongMoves === 4) {
        let starHide2 = document.querySelector("#star2");
        starHide2.style.display = "none";
    }
}


//congrats popup function//
function congratsUser() {
    let endTime = new Date();
    let timeDiffrence = endTime.getTime() - startTime.getTime();
    timeDiffrence = msToTime(timeDiffrence);
    let yourRating;
    if (wrongMoves <= 2) {
        yourRating = 3;
    } else if (wrongMoves >= 2 && wrongMoves <= 4) {
        yourRating = 2;
    } else if (wrongMoves >= 4) {
        yourRating = 1;
    }
    clearInterval(timer);
    swal("Congratulation! You Won with "+ yourRating + " star rating "  + " and time used " +timeDiffrence + "." + " Do you want to play again? ", {
      buttons: ["NO!", "YES!"],
    });
    freshBegin();
    //other method of confirm to get the pop-up.//
     //let response = confirm("Congratulation!You Won with star rating " + yourRating + " and time used " +timeDiffrence + " Do you want to play again");
    //if(response){
//}
}


//to shuffle card.
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//to create box-cards and calling shuffle function.
function createBoxCards() {
  let content = "";
  let boxCardsData = shuffle(box_Cards);
  boxCardsData.forEach((boxCard) => {
    content = content + `<div class= "box-cards" value="` + boxCard.value + `" clicked=false>
       <span class="items"> ` + boxCard.hash_key + `	</span>
    </div>`;
  });

  cards.innerHTML=content;
}

function toCreateBoxCardsAndItems(){
  boxItems = document.querySelectorAll(".items");
  boxCards = document.querySelectorAll(".box-cards");
}
