import React, { useState, useEffect } from 'react';

const App = () => {
  const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Ace to King
  const [diamonds, setDiamonds] = useState([]);
  const [spades, setSpades] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [finishDisabled, setFinishDisabled] = useState(true);

  // Convert number to card name
  const getCardName = (value, suit) => {
    const specialNames = { 1: "ace", 11: "jack", 12: "queen", 13: "king" };
    const cardName = specialNames[value] || value;
    return `${cardName}_of_${suit}.png`;
  };

  // Shuffle an array
  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  // Start game function
  const startGame = () => {
    if (gameStarted) return;
    setGameStarted(true);

    const shuffledDiamonds = shuffle([...cardValues.slice(0, 12)]); // Pick 12 cards (Ace to Queen)
    setDiamonds(shuffledDiamonds);
    setSpades(shuffle([...shuffledDiamonds])); // Same values, different order

    setTimeout(() => flipSpades(), 3000); // 3-second memorization phase
  };

  // Flip spades after memorization
  const flipSpades = () => {
    setSpades((prevSpades) =>
      prevSpades.map((value) => ({ value, hidden: true, draggable: true }))
    );
    setStartTime(Date.now());
    setFinishDisabled(true);
  };

  // Check if all slots are filled to enable Finish button
  const checkAllSlotsFilled = () => {
    const allFilled = document.querySelectorAll('.spade-slot').length === document.querySelectorAll('.spade-slot .spade-card').length;
    setFinishDisabled(!allFilled);
  };

  // Finish game function
  const finishGame = () => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Time in seconds
    let score = 0;

    document.querySelectorAll('.pair').forEach((pair) => {
      const diamond = pair.querySelector('.diamond-card');
      const spadeSlot = pair.querySelector('.spade-slot');
      const spade = spadeSlot.querySelector('.spade-card');

      if (spade) {
        const diamondValue = diamond.getAttribute('data-value');
        const spadeValue = spade.getAttribute('data-value');
        if (diamondValue === spadeValue) {
          score++;
        }
      }
    });

    alert(`Game Finished!\nTime taken: ${timeTaken.toFixed(2)} seconds\nCorrect matches: ${score} out of 12`);
  };

  // Drag functions
  const handleDragStart = (event, value) => {
    event.dataTransfer.setData('text', value);
  };

  const handleDrop = (event, slotIndex) => {
    event.preventDefault();
    const draggedValue = event.dataTransfer.getData('text');
    const updatedSpades = [...spades];
    updatedSpades[slotIndex] = { value: draggedValue, hidden: false, draggable: false };
    setSpades(updatedSpades);
    checkAllSlotsFilled();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="game">
      <button onClick={startGame} disabled={gameStarted}>
        Start Game
      </button>
      <button onClick={finishGame} disabled={finishDisabled}>
        Finish Game
      </button>

      <div className="board">
        <div id="diamondsColumn" className="column">
          {diamonds.map((value, index) => (
            <div key={index} className="pair">
              <div
                className="card diamond-card"
                style={{
                  backgroundImage: `url('images/${getCardName(value, "diamonds")}')`,
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

        <div id="spadesColumn" className="column">
          {spades.map((spade, index) => (
            <div key={index} className="spade-position">
              <div
                className={`card spade-card ${spade.hidden ? "hidden" : ""}`}
                style={{
                  backgroundImage: spade.hidden
                    ? "url('images/back.png')"
                    : `url('images/${getCardName(spade.value, "spades")}')`,
                }}
                data-value={spade.value}
                draggable={spade.draggable}
                onDragStart={(event) => handleDragStart(event, spade.value)}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
