import React, { useState } from 'react';
import MainPage from './components/MainPage';
import Game from './components/Game';
import './App.css';

const App = () => {
  const [page, setPage] = useState('main'); // 'main', 'gameNoMusic', 'gameWithMusic', 'results'
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
      setPage('gameWithMusic');
    } else if (page === 'gameWithMusic') {
      setResults((prev) => ({
        ...prev,
        withMusic: { time, score },
      }));
      setPage('results');
    }
  };

  const resultsPage = () => (
    <div className="results">
      <h2>Game Results for {userData.firstName} {userData.lastName}</h2>
      <p>No Music - Time: {results.noMusic.time?.toFixed(2)} seconds, Accuracy: {results.noMusic.score}/12</p>
      <p>With Music - Time: {results.withMusic.time?.toFixed(2)} seconds, Accuracy: {results.withMusic.score}/12</p>
    </div>
  );

  return (
    <div className="app">
      {page === 'main' && <MainPage onStartGame={handleStartGame} />}
      {page === 'gameNoMusic' && (
        <div className="game-container">
          <Game onGameFinish={handleGameFinish} playMusic={false} />
        </div>
      )}
      {page === 'gameWithMusic' && (
        <div className="game-container">
          <Game onGameFinish={handleGameFinish} playMusic={true} />
          <audio autoPlay loop>
            <source src="path/to/your/music.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {page === 'results' && resultsPage()}
    </div>
  );
};

export default App;