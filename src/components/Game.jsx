import React, { useState, useEffect } from 'react';
import './Game.css';
const LOCAL = "MemoryParing/";
const ONLINE = "https://hariomchadha.github.io/MemoryParing";
const BASE = ONLINE;

const Game = ({ onGameFinish, onNext, round, numCards, memorizationTime }) => {
  const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Ace to King
  const [diamonds, setDiamonds] = useState([]);
  const [spades, setSpades] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [finishDisabled, setFinishDisabled] = useState(true);
  const [memorizationTimeLeft, setMemorizationTimeLeft] = useState(memorizationTime); // Use prop
  const [isMemorizing, setIsMemorizing] = useState(false);
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const getCardName = (value, suit) => {
    const specialNames = { 1: "ace", 11: "jack", 12: "queen", 13: "king" };
    const cardName = specialNames[value] || value;
    return `${cardName}_of_${suit}.png`;
  };

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const startGame = () => {
    if (gameStarted || gameFinished) return; // Prevent restarting the same round
    setGameStarted(true);
    setIsMemorizing(true);
    setMemorizationTimeLeft(memorizationTime); // Reset to the prop value

    const shuffledDiamonds = shuffle([...cardValues.slice(0, numCards)]); // Use numCards prop
    setDiamonds(shuffledDiamonds);
    setSpades(shuffle([...shuffledDiamonds]));

    setTimeout(flipSpades, memorizationTime * 1000); // Use memorizationTime prop
  };

  useEffect(() => {
    let timer;
    if (isMemorizing && memorizationTimeLeft > 0) {
      timer = setInterval(() => {
        setMemorizationTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (memorizationTimeLeft === 0) {
      setIsMemorizing(false);
    }
    return () => clearInterval(timer);
  }, [isMemorizing, memorizationTimeLeft]);

  const flipSpades = () => {
    setSpades((prevSpades) =>
      prevSpades.map((value) => ({ value, hidden: true, draggable: true }))
    );
    setStartTime(Date.now());
    setFinishDisabled(true);
    setIsMemorizing(false);
  };

  const checkAllSlotsFilled = () => {
    const allFilled = document.querySelectorAll('.spade-slot').length === document.querySelectorAll('.spade-slot .spade-card').length;
    setFinishDisabled(!allFilled);
  };

  const animateCardMove = (card, target) => {
    const startRect = card.getBoundingClientRect();
    target.appendChild(card);
    const endRect = card.getBoundingClientRect();

    const deltaX = startRect.left - endRect.left;
    const deltaY = startRect.top - endRect.top;

    card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    card.style.transition = 'transform 0s';
    requestAnimationFrame(() => {
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'translate(0, 0)';
    });

    card.addEventListener('transitionend', () => {
      card.style.transition = '';
      card.style.transform = '';
    }, { once: true });
  };

  const handleDragStart = (event, value) => {
    const img = new Image();
    img.src = '/images/back.png';
    event.dataTransfer.setData('text', value);
    event.target.classList.add('dragging');
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('dragging');
  };

  const handleDrop = (event, slotIndex) => {
    event.preventDefault();
    const draggedValue = event.dataTransfer.getData('text');
    const droppedCard = document.querySelector(`.spade-card[data-value='${draggedValue}']`);
    const targetSlot = event.target;
    if (droppedCard && !targetSlot.querySelector('.spade-card')) {
      animateCardMove(droppedCard, targetSlot);
      checkAllSlotsFilled();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const finishGame = () => {
    const endTime = Date.now();
    const timeTaken_temp = (endTime - startTime) / 1000;
    let score_temp = 0;

    document.querySelectorAll('.pair').forEach((pair) => {
      const diamond = pair.querySelector('.diamond-card');
      const spadeSlot = pair.querySelector('.spade-slot');
      const spade = spadeSlot.querySelector('.spade-card');

      if (spade) {
        const diamondValue = diamond.getAttribute('data-value');
        const spadeValue = spade.getAttribute('data-value');
        if (diamondValue === spadeValue) {
          score_temp++;
        }
        spade.style.backgroundImage = `url('${BASE}/images/${getCardName(spadeValue, "spades")}')`;
        spade.classList.remove('hidden');
      }
    });
    setScore(score_temp);
    setTimeTaken(timeTaken_temp);

    setGameFinished(true);
    onGameFinish(timeTaken_temp, score_temp);
  };

  const Next = () => {
    setGameStarted(false);
    setDiamonds([]);
    setSpades([]);
    onNext();
  }


  return (
    <div className="game">
      <div className="game-container">
        <h1>Pair Association Learning Game</h1>
        <h2>{round}</h2>
        {isMemorizing && (
          <div className="timer">
            <p>Memorization Time Remaining: {memorizationTimeLeft} seconds</p>
          </div>
        )}
        {!isMemorizing && !gameFinished && (
          <div className="timer">
            <p>Drag and Drop the cards to match the pairs</p>
          </div>
        )}
        {gameFinished && (
          <div className="timer">
            <p>Game finished! Time taken: {timeTaken} seconds, Score: {score}</p>
           </div>
           )}
        <div className="button-container">
          {!gameFinished && (
            <button onClick={startGame} disabled={gameStarted}>
              Start Game
            </button>
          )}
          {!gameFinished && (
            <button onClick={finishGame} disabled={finishDisabled}>
              Finish Game
            </button>
          )}
          {gameFinished && (
            <button onClick={Next}>
              Next
            </button>
          )}
        </div>

        {gameStarted && (
          <div className="board">
            <div id="diamondsColumn" className="column">
              <h2>Diamonds</h2>
              <div className="card-grid">
                {diamonds.map((value, index) => (
                  <div key={index} className="pair">
                    <div
                      className="card diamond-card"
                      style={{
                        backgroundImage: `url('${BASE}/images/${getCardName(value, "diamonds")}')`,
                      }}
                      data-value={value}
                    ></div>
                    <div
                      className="spade-slot"
                      onDragOver={handleDragOver}
                      onDrop={(event) => handleDrop(event, index)}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div id="spadesColumn" className="column">
              <h2>Spades</h2>
              <div className="card-grid">
                {spades.map((spade, index) => (
                  <div key={index} className="spade-position">
                    <div
                      className={`card spade-card ${spade.hidden ? "hidden" : ""}`}
                      style={{
                        backgroundImage: spade.hidden
                          ? `url('${BASE}/images/back.png')`
                          : `url('${BASE}/images/${getCardName(spade.value || spade, "spades")}')`,
                      }}
                      data-value={spade.value || spade}
                      draggable={spade.draggable || false}
                      onDragStart={(event) => handleDragStart(event, spade.value || spade)}
                      onDragEnd={handleDragEnd}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;