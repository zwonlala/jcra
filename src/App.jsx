import React, { useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer';

/** mock api url */
const URL = 'https://yts.mx/api/v2/list_movies.json';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios(URL);
      console.log('SJW', data.body);
    };
    fetchData();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Timer />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
