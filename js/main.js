  /*----- constants -----*/
  //1.1) define the cards deck with 4 different suits and the cards within each suit.  (Spades,hearts,clover,diamonds)(Ace through king) 
  //Arr of obj 
  const deck = [
    {rank: 'heart', suit: "Ace" },

  ]

   // 1.2) define the board with 5 card positions on each side of the board with null spaces to identify they are empty before the game starts.  - cached
  
    // 1.3) define the winning conditions- if  player reaches 21 stop and wait for dealer or if the dealer reaches 21 stop and let dealer win. If both are 21 it is a tie. 
  

   // 1.4) How much wager they start out with  total amount of chips 
  

  /*----- state variables -----*/
let winner;
let dealerBoard;
let playerBoard;


  /*----- cached elements */ 
const messageEl = document.querySelector('h1')
const startButton = document.getElementById('startbutton')
  /*----- event listeners -----*/
startButton.addEventListener('click',start);

  /*----- functions -----*/
  init()

    function init(){
      dealerBoard = [null,null,null,null,null]
      playerBoard = [null,null,null,null,null]
      winner = null
      deckShuffle()
      render()

  }

    function render(){
    renderDeck()
   
  }


    function start(){
    console.log("hi");
 
  }