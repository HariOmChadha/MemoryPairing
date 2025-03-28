import logo from './logo.svg';
import './App.css';
import MainPage from './components/mainPage'; // Import the MainPage component

const App = () => {
  const page = 1;

  return (
    <div className="App">
      {page === 1 ? (
        <MainPage /> // Render MainPage if page is 1
      ) : (
        <p>Current Page: {page}</p>
      )}
    </div>
  );
};

export default App;
