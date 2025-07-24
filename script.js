let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

//alternative for the above default operator (falsy || deafult)
/*if (!score){
score = { 
  wins: 0,
  losses: 0,
  ties: 0
}
}*/



function pickComputerMove(){
const randomNumber = Math.random();
let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1/3 ){
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {       //setInterval(function() , time in milliseconds)  ; returns an id (everytime it runs) which can be used to stop the interval
      const playermove = pickComputerMove();
      playgame(playermove);
    } , 2000);
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop playing';
    isAutoPlaying = true; 
  } else{
    clearInterval(intervalId);        //to stop an interval
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button').addEventListener('click' , () => {
  playgame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click' , () => {
  playgame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click' , () => {
  playgame('scissors');
});

document.querySelector('.js-reset-score-button').addEventListener('click' , () => {
  document.querySelector('.js-reset-prompt').innerHTML = `
      <p class = "reset-prompt">Are you sure you want to reset the score?</p>
      <button class = "choice-button js-yes-button">Yes</button>
      <button class = "choice-button js-no-button">No</button>
    `;

    document.querySelector('.js-yes-button').addEventListener('click' , () => {
      score.wins = 0;
      score.losses = 0; 
      score.ties = 0;
      updateScoreElement();
      document.querySelector('.js-reset-prompt').innerHTML = '';
    })
    document.querySelector('.js-no-button').addEventListener('click' , () => {
      document.querySelector('.js-reset-prompt').innerHTML = '';
    })
});

document.querySelector('.js-auto-play-button').addEventListener('click' , () => {
  autoPlay();
});

document.body.addEventListener('keydown' , (event) => {
  if ( event.key === 'r'){
    playgame('rock');
  } else if (event.key === 'p') {
    playgame('paper');
  } else if (event.key === 's'){
    playgame('scissors');
  } else if (event.key === 'a'){
    autoPlay();
  } else if (event.key === 'Backspace'){
    document.querySelector('.js-reset-prompt').innerHTML = `
      <p class = "reset-prompt">Are you sure you want to reset the score?</p>
      <button class = "choice-button js-yes-button">Yes</button>
      <button class = "choice-button js-no-button">No</button>
    `;

    document.querySelector('.js-yes-button').addEventListener('click' , () => {
      score.wins = 0;
      score.losses = 0; 
      score.ties = 0;
      updateScoreElement();
      document.querySelector('.js-reset-prompt').innerHTML = '';
    })
    document.querySelector('.js-no-button').addEventListener('click' , () => {
      document.querySelector('.js-reset-prompt').innerHTML = '';
    })
  }
});


function playgame (playermove){
let computerMove = pickComputerMove();
let result = '';

if (playermove === 'scissors'){
  if (computerMove === 'rock')
    result = 'You lose.....';
  else if (computerMove === 'scissors')
    result = 'Tie.....';
  else if (computerMove === 'paper')
    result = 'You win.....';

} else if (playermove === 'rock'){
    if (computerMove === 'paper')
      result = 'You lose.....';
    else if (computerMove === 'rock')
      result = 'Tie.....';
    else if (computerMove === 'scissors')
      result = 'You win.....';
    
} else if (playermove === 'paper'){
    if (computerMove === 'scissors')
      result = 'You lose.....';
    else if (computerMove === 'paper')
      result = 'Tie.....';
    else if (computerMove ==='rock')
      result = 'You win.....';
  }

if (result === 'You win.....'){
  score.wins += 1;
} else if (result === 'You lose.....'){
  score.losses += 1;
}else {
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));
updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML 
  = `You
    <img class="move-icon" src="images/${playermove}-emoji.png">
    <img class="move-icon" src="images/${computerMove}-emoji.png">
    Computer`;
}

function updateScoreElement(){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}