  /*----- constants -----*/
  //1.1) define the cards deck with 4 different suits and the cards within each suit.  (Spades,hearts,clover,diamonds)(Ace through king) 
  //Arr of obj 
  const deck = [ ]
  const suits = [ "Spades","Diamonds","Club","Heart"]
  const rank = [ "Ace",'2','3','4','5','6','7','8','9','10','Jack','Queen','King']

  const COLORS = {
    'null': 'white',
    '1':'Yellow',
    '-1' : 'Purple'
  }
  
    // 1.3) define the winning conditions- if  player reaches 21 stop and wait for dealer or if the dealer reaches 21 stop and let dealer win. If both are 21 it is a tie. 
  

   // 1.4) How much wager they start out with  total amount of chips 
  const pot = 1000

  /*----- state variables -----*/
let winner;
let dealerHand;
let playerHand;
let shuffledDeck; 

  /*----- cached elements */ 
const messageEl = document.querySelector('h1')
const startButton = document.getElementById('startbutton')
  /*----- event listeners -----*/
startButton.addEventListener('click',start);

  /*----- functions -----*/
  init()

    function init(){
      dealerHand = [null,null,null,null,null]
      playerHand = [null,null,null,null,null]
      winner = null
      createDeck()
      
      render()

  }

  function createDeck(){
    for (let i=0; i < suits.length; i++){     //iterate over ranks while iterating over the suits to create card
      for (let j=0; j<rank.length; j++) {
        let card = {Rank: rank[j], Suit: suits[i]};
        deck.push(card);
      }
    }
  }

  function renderPlayerHand(){
    playerHand.forEach(function(cellVal, cellidx){
      console.log(cellVal,cellidx)
      const playerhandEl =document.getElementById(`phand${cellidx}`)
      playerhandEl.style.backgroundColor = COLORS[cellVal];
    })
  }

    function render(){
   renderPlayerHand()
   renderDealerHand()
   
  }


    function start(){
    console.log("hi");
 
  }