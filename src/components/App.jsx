import React, { useState } from 'react';
import MainPage from './MainPage';
import Game from './Game';
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

  const handleStartGame = (data) => {
    setUserData(data);
    setPage('gameNoMusic');
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
    setPage('gameWithMusic'); // Transition to Round 2
  };

  const resultsPage = () => (
    <div className="results">
      <h2>Thanks a lot!</h2>
      <h3>Game Results for {userData.firstName} {userData.lastName}</h3>
      <p>No Music - Time: {results.noMusic.time?.toFixed(2)} seconds, Accuracy: {results.noMusic.score}/12</p>
      <p>With Music - Time: {results.withMusic.time?.toFixed(2)} seconds, Accuracy: {results.withMusic.score}/12</p>
    </div>
  );

  return (
    <div className="app">
      {page === 'main' && <MainPage onStartGame={handleStartGame} />}
      {page === 'gameNoMusic' && (
        <div className="game-container">
          <Game
            onGameFinish={handleGameFinish}
            playMusic={false}
            showNextButton={showNextButton}
            onNext={handleNext}
          />
        </div>
      )}
      {page === 'gameWithMusic' && (
        <div className="game-container">
          <Game
            onGameFinish={handleGameFinish}
            playMusic={true}
            showNextButton={false}
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