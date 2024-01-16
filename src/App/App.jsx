import axios from 'axios';
import React, { useEffect } from 'react';

import LogoComponent from './logo.svg';
import './App.css';
import './App.custom.sass';
import Timer from '../component/Timer/Timer';

/** mock api url */
const URL = 'https://yts.mx/api/v2/list_movies.json';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios(URL);
      console.log('SJW', data);
      console.log('SJW2', data.data.data);
    };
    fetchData();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <LogoComponent className='App-logo' />
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
