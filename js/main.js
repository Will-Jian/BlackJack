  /*----- constants -----*/
  const originalDeck = [ ]
  const suits = [ "s","d","c","h"]
  const rank = [ '02','03','04','05','06','07','08','09','10','J','Q','K','A']
  
  



  /*----- state variables -----*/
let winner;
let dealerHand;
let playerHand;
let shuffledDeck; 
let betAmount;
let pot;

  /*----- cached elements */ 
const startButton = document.getElementById('startbutton')
const hitButton = document.getElementById('hitButton')
const standButton = document.getElementById('standButton')
const messageEl = document.getElementById('message')
const betButton = document.getElementById('bet')
const wageamountEl = document.getElementById('wageamount');
const wageBankEl = document.getElementById('wageBank')
  /*----- event listeners -----*/
startButton.addEventListener('click',start);
hitButton.addEventListener('click',hitFunc)
standButton.addEventListener('click',standFunc)
betButton.addEventListener('click', betFunc)

  /*----- functions -----*/
  init()


  function init(){
    pot = 1000
    startButton.style.visibility = "visible"
    hitButton.style.visibility = "hidden" 
    standButton.style.visibility = "hidden"  

    wageBankEl.innerHTML = pot
      dealerHand = []
      playerHand = []
      playerPoints = 0
      dealerPoints = 0
      createDeck()
      renderNewShuffledDeck() 
  }

  function createDeck(){
    for (let i=0; i < suits.length; i++){     
      for (let j=0; j<rank.length; j++) {
        let card = {face: `${suits[i]}${rank[j]}`, value: Number(rank[j]) || (rank[j] === 'A' ? 11 : 10), backside: "back-side"}
        originalDeck.push(card);  
      }
    }
  }

  function buildShuffledDeck(){
    const tempDeck = [...originalDeck];
    const newShuffledDeck = [];
    for (let i = 0; i <originalDeck.length; i++){
      const randomIdx = Math.floor(Math.random()*tempDeck.length);
      newShuffledDeck.push(tempDeck.splice(randomIdx, 1)[0])
    }  
    return newShuffledDeck;
  }


  function renderDeckInContainer(anyDeck,container){
    container.innerHTML = '';
    let cardsHtml = '';
    let cardsHtml1 = '';
    let cardsHtml2 = '';
    

      for (let i=0; i <1; i++){
        cardsHtml1+= ` <div class="card-${anyDeck[i].backside}"></div>`;

        cardsHtml1 += ` <div class="card ${anyDeck[i].face}"></div>`; 
       // cardsHtml1+= ` <div class="card-${anyDeck[i].backside}"></div>`;
        cardsHtml += `<div class = "flip-card"> ${cardsHtml1} </div>`;
    }
       container.innerHTML += cardsHtml

    for (let i =1; i < anyDeck.length; i++){
        cardsHtml2 += `<div class="card ${anyDeck[i].face}"></div>`; 
    }
    container.innerHTML += cardsHtml2

  }

    
   /*  anyDeck.forEach(function(card){
    cardsHtml1 = ` <div class="card ${card.face}"></div>`; 
    //cardsHtml+= `<div class="flip-card-front">${flipCardFront}</div>`
    cardsHtml2 = ` <div class="card-${card.backside}"></div>`;

    cardsHtml += `<div class = "flip-card"> ${cardsHtml1} ${cardsHtml2}</div>`
    
    //container.innerHTML = cardsHtml;
    });
    container.innerHTML = cardsHtml;
    //cardhtml1 += `<div class = "flip-card"> ${cardsHtml}</div>`

   //container.innerHTML = cardhtml1;
  }
*/

  function renderNewShuffledDeck(){
    shuffledDeck = buildShuffledDeck();
  }
  function reshuffleDeck(){
    if (shuffledDeck = [])
    shuffledDeck = buildShuffledDeck();
  }
    
  

  function renderPlayerHand(){
    renderDeckInContainer(playerHand, document.getElementById('playerHand'))
  }
  function renderDealerHand(){
    renderDeckInContainer(dealerHand, document.getElementById('dealerHand'))
  }

 



  function render(){
    renderButtons();
    renderPlayerHand();
    renderDealerHand();
    renderMessage();
    reshuffleDeck();
    
  }


  function start(){
    betButton.style.visibility = "hidden"
    if (wageamountEl.value !== '' && wageamountEl.value < pot){
      winner = null;
      playerHand = []
      dealerHand = []
      playerHand[0] = shuffledDeck.shift();
      dealerHand[0] = shuffledDeck.shift();
      playerHand[1] = shuffledDeck.shift();
      dealerHand[1] = shuffledDeck.shift();
      playerPoints = checkHandScore(playerHand);
      dealerPoints = checkHandScore(dealerHand);
      winner = checkWinner()
      render()
  } else if (wageamountEl.value > pot && wageamountEl.value !== '') {
      messageEl.innerHTML = "not enough money!"
  } else {
      messageEl.innerHTML = "forgot to place bet!"
  }

}

  


function checkHandScore(hand){
  let totalScore =0
  let totalAce =0
  hand.forEach(function addValue(obj) {
    if (obj.value == 11){totalAce += 1, totalScore+= obj.value} else {totalScore+= obj.value}
    })
  while (totalScore > 21 && totalAce > 0) {
    totalScore-=10
    totalAce-=1
  }
return totalScore;
}


function hitFunc(){
  playerHand.push(shuffledDeck.shift())
  playerPoints = checkHandScore(playerHand);
  winner = checkWinner();
  render()
}


function standFunc(){
    while (dealerPoints <= 15 && dealerPoints < playerPoints)  {
      dealerHand.push(shuffledDeck.shift())
      dealerPoints = checkHandScore(dealerHand)
    }
    playerPoints = checkHandScore(playerHand);
       if (checkWinner() === undefined){
        winner = checkWinnerStand()
      } 
        else {
        winner = checkWinner()
      }
      
     
      render()
  }
  


function checkWinner(){
  if ( playerPoints  > 21 ){
    pot -= betAmount
    wageBankEl.innerHTML = parseInt(pot)
    return "dealer"
  }  else if (dealerPoints > 21){
    pot += betAmount
    wageBankEl.innerHTML = pot
    return "player"
  } else if (playerPoints === 21 && dealerPoints === 21){
    pot -= betAmount 
    return "dealer"
  } else if ( playerPoints === 21){
    pot += betAmount
    wageBankEl.innerHTML = pot
    return "player"
  } else if ( dealerPoints === 21){
    pot -= betAmount
    wageBankEl.innerHTML = pot
    return "dealer"
  } 

}

function checkWinnerStand (){
  if (dealerPoints > playerPoints && dealerPoints < 21){
    pot -= betAmount
    wageBankEl.innerHTML = pot
    return "dealer"
  } else if (playerPoints > dealerPoints && dealerPoints < 21){
        pot += betAmount
        wageBankEl.innerHTML = pot
        return "player"
  }  else if (playerPoints === dealerPoints){
    pot -= betAmount 
    wageBankEl.innerHTML = pot
    return "dealer"
  }
}

function betFunc (){
  betAmount = parseFloat(wageamountEl.value);
  messageEl.innerHTML = ""
  //wageamountEl.value = ''
  
  }

function renderMessage(){
    if (winner === "player") {
      messageEl.innerHTML = "You Won"
    } else if ( winner === "dealer"){
      messageEl.innerHTML = "Dealer Won"
    } else if (winner === "tie") {
      messageEl.innerHTML = "TIE"
    } else {
      messageEl.innerHTML = ""
    }
}

function renderButtons() {
  winner ? startButton.style.visibility = "visible" : startButton.style.visibility = "hidden"
  winner ? hitButton.style.visibility = "hidden" : hitButton.style.visibility = "visible"
  winner ? standButton.style.visibility = "hidden" : standButton.style.visibility = "visible"
}


