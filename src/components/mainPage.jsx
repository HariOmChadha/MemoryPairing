import React, { useState } from 'react';
import './MainPage.css';

const MainPage = ({ onStartGame }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEngSci, setIsEngSci] = useState(false);
  const [isSecondYear, setIsSecondYear] = useState(false);

  const handleSubmit = () => {
    onStartGame({ firstName, lastName, isEngSci, isSecondYear });
  };

  const isFormComplete = firstName && lastName && isEngSci && isSecondYear;

  return (
    <div className="main-page">
      <div className="main-page-container">
        <h1>Pair Association Learning Game</h1>
        <p>
          Welcome to the ECE286 survey! Please fill in the information below so we can confirm that you are a 2nd-year engineering Science student.
        </p>
        <p>
          In this game, you will have 30 seconds to memorize the positions of the cards on the right side (Spades). After the 30 seconds, the set of cards on the right will turn over, and you will need to match the pairs with the cards on the left (Diamonds) based on your memory. Note: The cards on the left will stay open throughout. 
          <br />
          <br />
          There will be two rounds: without music and with music. <strong>Please wear headphones </strong>and turn up your volume for the intended data collection during the music round.
        </p>
        <div className="form-box">
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={isEngSci}
              onChange={(e) => setIsEngSci(e.target.checked)}
            />
            I am in EngSci
          </label>
          <label>
            <input
              type="checkbox"
              checked={isSecondYear}
              onChange={(e) => setIsSecondYear(e.target.checked)}
            />
            I am in second year
          </label>
          <button onClick={handleSubmit} disabled={!isFormComplete}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;