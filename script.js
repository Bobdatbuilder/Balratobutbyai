const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let score = 0;

function drawHand() {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }

  const hand = [];
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * deck.length);
    hand.push(deck.splice(index, 1)[0]);
  }

  displayHand(hand);
  evaluateHand(hand);
}

function displayHand(hand) {
  const handDiv = document.getElementById('hand');
  handDiv.innerHTML = '';
  hand.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.textContent = card.rank + card.suit;
    handDiv.appendChild(cardDiv);
  });
}

function evaluateHand(hand) {
  const counts = {};
  hand.forEach(card => {
    counts[card.rank] = (counts[card.rank] || 0) + 1;
  });
  const values = Object.values(counts);
  const resultText = document.getElementById('handResult');

  if (values.includes(4)) {
    resultText.textContent = 'Four of a Kind! +80';
    score += 80;
  } else if (values.includes(3) && values.includes(2)) {
    resultText.textContent = 'Full House! +50';
    score += 50;
  } else if (values.includes(3)) {
    resultText.textContent = 'Three of a Kind! +30';
    score += 30;
  } else if (values.filter(x => x === 2).length === 2) {
    resultText.textContent = 'Two Pair! +20';
    score += 20;
  } else if (values.includes(2)) {
    resultText.textContent = 'One Pair! +10';
    score += 10;
  } else {
    resultText.textContent = 'High Card. +5';
    score += 5;
  }

  document.getElementById('scoreDisplay').textContent = 'Score: ' + score;
}