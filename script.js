let boxContents = [];
let gameOver = false;
let points = 0;
let wins = 0;
let losses = 0;
let trials = 0;
const maxTrials = 5;

function updateScoreboard() {
  document.getElementById('points').textContent = points;
  document.getElementById('trials').textContent = trials;
}

function initGame() {
  // Randomly assign contents: prize, trap, or empty to each box
  const contents = ['prize', 'trap', 'empty'];
  boxContents = [];
  while (boxContents.length < 9) {
    const choice = contents[Math.floor(Math.random() * contents.length)];
    boxContents.push(choice);
  }
  gameOver = false;
  trials = 0;
  document.getElementById('result').textContent = '';
  for (let i = 1; i <= 9; i++) {
    const box = document.getElementById('box' + i);
    box.style.backgroundColor = '#fff';
    box.style.color = '#666';
    box.style.cursor = 'pointer';
    box.textContent = 'Box ' + i;
  }
  updateScoreboard();
  document.body.style.backgroundColor = '#e0f0ff'; // light blue background on init
}

function chooseBox(boxNumber) {
  if (gameOver) return;
  const resultDiv = document.getElementById('result');
  const box = document.getElementById('box' + boxNumber);
  const content = boxContents[boxNumber - 1];

  if (trials >= maxTrials) {
    // Do not allow further play until reset
    return;
  }

  if (content === 'prize') {
    points += 10;
    resultDiv.textContent = 'Congratulations! You found the prize!';
    resultDiv.className = 'result win';
    box.style.backgroundColor = 'green';
    box.style.color = 'white';
  } else if (content === 'trap') {
    losses += 1;
    resultDiv.textContent = 'Oh no! You found a trap! You lose!';
    resultDiv.className = 'result lose';
    box.style.backgroundColor = 'red'; // red for trap
    box.style.color = 'white';
  } else {
    resultDiv.textContent = 'The box is empty. Try again!';
    resultDiv.className = 'result neutral';
    box.style.backgroundColor = 'yellow';
    box.style.color = 'black';
  }
  // Keep the clicked box colored and disable it
  box.style.cursor = 'default';
  box.onclick = null;

  trials++;
  updateScoreboard();

  if (trials === maxTrials) {
    // Show result of last trial first
    setTimeout(() => {
      declareOverallWinner();
      document.querySelector('button.reset').disabled = false;
    }, 1500);
  }
}

function resetBoxes() {
  for (let i = 1; i <= 9; i++) {
    const box = document.getElementById('box' + i);
    box.style.backgroundColor = '#fff';
    box.style.color = '#666';
    box.style.cursor = 'pointer';
    box.textContent = 'Box ' + i;
    box.onclick = function() { chooseBox(i); };
  }
}

function declareOverallWinner() {
  const resultDiv = document.getElementById('result');
  const body = document.body;
  if (points >= 30) {
    wins = 1;
    resultDiv.textContent = 'Hurray! You are the overall winner!';
    resultDiv.className = 'result win';
    body.style.backgroundColor = '#28a745'; // bright green background for win
    body.style.backgroundImage = 'none';
    body.classList.add('win-background');
    body.classList.remove('lose-background');
  } else {
    wins = 0;
    resultDiv.textContent = 'Oh no! The computer wins overall!';
    resultDiv.className = 'result lose';
    body.style.backgroundColor = 'red'; // red background for lose
    body.style.backgroundImage = 'none';
    body.classList.add('lose-background');
    body.classList.remove('win-background');
  }
  gameOver = true;
  // Removed alert message as per user request
}

function resetGame() {
  // Reset the game state to allow playing again at any time
  gameOver = false;
  trials = 0;
  points = 0;
  wins = 0;
  losses = 0;
  document.getElementById('result').textContent = '';
  document.body.style.background = 'linear-gradient(-45deg, #d898b8, #e66f96, #f9d8e8, #f7c8d8)'; // pink gradient background on reset
  document.body.style.backgroundSize = '400% 400%';
  document.body.style.animation = 'gradientBG 15s ease infinite';
  for (let i = 1; i <= 9; i++) {
    const box = document.getElementById('box' + i);
    box.style.backgroundColor = '#fff';
    box.style.color = '#666';
    box.style.cursor = 'pointer';
    box.textContent = 'Box ' + i;
    box.onclick = function() { chooseBox(i); };
  }
  // Reassign new contents for the boxes for the new trial
  const contents = ['prize', 'trap', 'empty'];
  boxContents = [];
  while (boxContents.length < 9) {
    const choice = contents[Math.floor(Math.random() * contents.length)];
    boxContents.push(choice);
  }
  updateScoreboard();
  // Enable Play Again button always to allow restart anytime
  document.querySelector('button.reset').disabled = false;
}
window.onload = initGame;
