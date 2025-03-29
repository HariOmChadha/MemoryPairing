import React, { useState } from 'react';
import MainPage from './MainPage';
import Game from './Game';
import Submission from './Submission';
import './App.css';

const App = () => {
  const [page, setPage] = useState('main');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    isEngSci: false,
    isSecondYear: false,
  });
  const [results, setResults] = useState({
    noMusic: { time: null, score: null },
    withMusic: { time: null, score: null },
  });
  const [showNextButton, setShowNextButton] = useState(false); // New state for Next button
  const [roundOrder, setRoundOrder] = useState([]); // Tracks the order of rounds
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0); // Tracks the current round (0 for Round 1, 1 for Round 2)

  const handleStartGame = (data) => {
    setUserData(data);

    // Randomize the first round (either gameNoMusic or gameWithMusic)
    const rounds = ['gameNoMusic', 'gameWithMusic'];
    const firstRound = rounds[Math.floor(Math.random() * rounds.length)]; // Randomly pick Round 1
    setPage(firstRound); // Set the first round
    setRoundOrder([firstRound]); // Initialize the round order with the first round
    setCurrentRoundIndex(0); // Start with Round 1
  };

  const handleSubmissionComplete = () => {
    // Optionally, you can redirect or show a final message here
    console.log('Submission complete');
  };

  const handleGameFinish = (time, score) => {
    if (page === 'gameNoMusic') {
      setResults((prev) => ({
        ...prev,
        noMusic: { time, score },
      }));
      setShowNextButton(true); // Show the Next button instead of transitioning
    } else if (page === 'gameWithMusic') {
      const updatedResults = {
        ...results,
        withMusic: { time, score },
      };
      setResults(updatedResults);
      setPage('results');
    }
  };

  const handleNext = () => {
    setShowNextButton(false); // Hide the Next button

    // Set Round 2 to the round that hasn't been played yet
    const firstRound = roundOrder[0];
    const secondRound = firstRound === 'gameNoMusic' ? 'gameWithMusic' : 'gameNoMusic';
    const newRoundOrder = [firstRound, secondRound]; // Round 2 is the opposite of Round 1
    setRoundOrder(newRoundOrder); // Update the round order
    setCurrentRoundIndex(1); // Move to Round 2
    setPage(secondRound); // Transition to Round 2
  };

  const resultsPage = () => (
    <div className="results">
      <h2>Thanks a lot!</h2>
      <h3>Game Results for {userData.firstName} {userData.lastName}</h3>
      <p>No Music - Time: {results.noMusic.time?.toFixed(2)} seconds, Accuracy: {results.noMusic.score}/12</p>
      <p>With Music - Time: {results.withMusic.time?.toFixed(2)} seconds, Accuracy: {results.withMusic.score}/12</p>
      <Submission
        userData={userData}
        results={results}
        onSubmissionComplete={handleSubmissionComplete}
      />
    </div>
  );

  return (
    <div className="app">
      {page === 'main' && <MainPage onStartGame={handleStartGame} />}
      {page === 'gameNoMusic' && (
        <div className="game-container">
          <Game
            onGameFinish={handleGameFinish}
            showNextButton={showNextButton}
            onNext={handleNext}
          />
        </div>
      )}
      {page === 'gameWithMusic' && (
        <div className="game-container">
          <Game
            onGameFinish={handleGameFinish}
            showNextButton={showNextButton}
            onNext={handleNext}
          />
          <iframe
            width="0"
            height="0"
            src="https://www.youtube.com/embed/pfs3AsE_sHI?start=273&autoplay=1&loop=1&playlist=pfs3AsE_sHI"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="background music"
          ></iframe>
        </div>
      )}
      {page === 'results' && resultsPage()}
    </div>
  );
};

export default App;