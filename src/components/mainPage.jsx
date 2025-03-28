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
        <h1>Paired Associate Learning Game</h1>
        <p>
          Welcome to the ECE286 survey! Please fill in the information below so we can confirm that you are a 2nd-year engineering student.
        </p>
        <p>
          In this game, you will have 30 seconds to memorize the positions of the cards on the right side (Spades). After the 30 seconds, the set of cards on the right will turn over, and you will need to match the pairs with the cards on the left (Diamonds) based on your memory. There will be two rounds: the first round will be without music, and the second round will be with music. Please wear headphones and turn up your volume for the best experience during the music round.
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