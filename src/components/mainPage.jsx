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
      <h1>Paired Associate Learning Game</h1>
      <p>Memorize the card pairs, then match the hidden spades to the diamonds.</p>
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
  );
};

export default MainPage;