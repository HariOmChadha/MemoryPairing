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
    // Start with the test run instead of Round 1
    setPage('test_run');
    setCurrentRoundIndex(-1); // Indicate test run (not part of the main rounds)
  };

  const handleSubmissionComplete = () => {
    console.log('Submission complete');
  };

  const handleGameFinish = (time, score) => {
    if (page === 'gameNoMusic') {
      setResults((prev) => ({
        ...prev,
        noMusic: { time, score },
      }));
    } else if (page === 'gameWithMusic') {
      setResults((prev) => ({
        ...prev,
        withMusic: { time, score },
      }));
    }
  };
  
  const handleNext = () => {
  
    if (page === 'test_run') {
      // After the test run, proceed to Round 1
      const rounds = ['gameNoMusic', 'gameWithMusic'];
      const firstRound = rounds[Math.floor(Math.random() * rounds.length)]; // Randomly pick Round 1
      setPage(firstRound);
      setRoundOrder([firstRound]);
      setCurrentRoundIndex(0);
    } else if (page === 'gameNoMusic' || page === 'gameWithMusic') {
      if (currentRoundIndex === 0) {
        // After Round 1, proceed to Round 2
        const firstRound = roundOrder[0];
        const secondRound = firstRound === 'gameNoMusic' ? 'gameWithMusic' : 'gameNoMusic';
        const newRoundOrder = [firstRound, secondRound];
        setRoundOrder(newRoundOrder);
        setCurrentRoundIndex(1);
        setPage(secondRound);
      } else {
        // After Round 2, go to results page
        setPage('results');
      }
    }
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
      {page === 'test_run' && (
        <div className="game-container">
          <Game
            onGameFinish={handleGameFinish}
            showNextButton={showNextButton}
            onNext={handleNext}
            round="Test Run"
            numCards={4} // Test run with 5 cards
            memorizationTime={10} // Test run with 15 seconds
          />
        </div>
      )}
      {page === 'gameNoMusic' && (
        <div className="game-container">
          <Game
            onGameFinish={handleGameFinish}
            showNextButton={showNextButton}
            onNext={handleNext}
            round={currentRoundIndex === 0 ? 'Round 1' : 'Round 2'}
            numCards={12} // Regular rounds with 12 cards
            memorizationTime={30} // Regular rounds with 30 seconds
          />
        </div>
      )}
      {page === 'gameWithMusic' && (
        <div className="game-container">
          <Game
            onGameFinish={handleGameFinish}
            showNextButton={showNextButton}
            onNext={handleNext}
            round={currentRoundIndex === 0 ? 'Round 1' : 'Round 2'}
            numCards={12} // Regular rounds with 12 cards
            memorizationTime={30} // Regular rounds with 30 seconds
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