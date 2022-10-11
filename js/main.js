  /*----- constants -----*/
  //1.1) define the cards deck with 4 different suits and the cards within each suit.  (Spades,hearts,clover,diamonds)(Ace through king) 
  //Arr of obj 
  const originalDeck = [ ]
  const suits = [ "s","d","c","h"]
  const rank = [ '02','03','04','05','06','07','08','09','10','J','Q','K','A']
  
    // 1.3) define the winning conditions- if  player reaches 21 stop and wait for dealer or if the dealer reaches 21 stop and let dealer win. If both are 21 it is a tie. 
  

   // 1.4) How much wager they start out with  total amount of chips 
  const pot = [1000]

  /*----- state variables -----*/
let winner;
let dealerHand;
let playerHand;
let shuffledDeck; 
let playerPoints = 0;
let dealerPoints = 0;

  /*----- cached elements */ 
const messageEl = document.querySelector('h1')
const startButton = document.getElementById('startbutton')
const hitButton = document.getElementById('hitButton')
const standButton = document.getElementById('standButton')
  /*----- event listeners -----*/
startButton.addEventListener('click',start);
hitButton.addEventListener('click',hitFunc)
standButton.addEventListener('click',standFunc)

  /*----- functions -----*/
    init()



  function init(){
      dealerHand = []
      playerHand = []
      playerTotal = 0
      dealerTotal = 0
      createDeck()
      render()

  }

  function createDeck(){
    for (let i=0; i < suits.length; i++){     //iterate over ranks while iterating over the suits to create card
      for (let j=0; j<rank.length; j++) {
        let card = {face: `${suits[i]}${rank[j]}`, value: Number(rank[j]) || (rank[j] === 'A' ? 11 : 10)}
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


//renders to container 
  function renderDeckInContainer(anyDeck,container){
    container.innerHTML = '';
    let cardsHtml = '';
    anyDeck.forEach(function(card){
    cardsHtml += ` <div class="card ${card.face}"></div>`
});
    container.innerHTML = cardsHtml;
}


  function renderNewShuffledDeck(){
    shuffledDeck = buildShuffledDeck();
    //renderDeckInContainer(shuffledDeck,document.getElementById('shuffleddeck'))
}

  function renderPlayerHand(){
    renderDeckInContainer(playerHand, document.getElementById('playerHand'))
  }
  function renderDealerHand(){
    renderDeckInContainer(dealerHand, document.getElementById('dealerHand'))
  }

 

/* 
  function renderWagerBank(){
    console.log("render wage")
  }

*/

  function render(){
    renderNewShuffledDeck()
    renderPlayerHand()
    renderDealerHand()
  
  }


  function start(){
    playerHand = []
    dealerHand = []
    playerHand[0] = shuffledDeck.shift();
    dealerHand[0] = shuffledDeck.shift();
    playerHand[1] = shuffledDeck.shift();
    dealerHand[1] = shuffledDeck.shift();
    playerPoints = checkHandScore(playerHand);
    dealerPoints = checkHandScore(dealerHand);
   console.log( playerPoints,dealerPoints)
    render()
  }

 

  function hitFunc(){
    // check if value is 21 or over 
    if (playerHand[0] && playerHand[1] !== undefined)
    playerHand.push(shuffledDeck.shift());
    render()  
}


function checkHandScore(hand){
  let totalScore =0
  let totalAce =0
  hand.forEach(function addValue(obj) {
    console.log(obj.value,"add value") 
    totalScore += obj.value
  })
//  if (obj.value === 11){
//   totalAce +=1
//  } else {
//   totalScore += obj.value
//  }
/*while (totalScore > 21 && totalAce >0){
  totalScore -=10
  totalAce -=1
} 
*/
return totalScore;
}


 


  function standFunc(){
    console.log("stand")
    // caculate the total value of cards 
    //upon stand move over to dealer functions to run hit/stand 
  }
  

  //renderDeckInContainer(shuffledDeck,document.getElementById('useddeck')
