import LogoComponent from './logo.svg';
import Timer from '../Timer/Timer';

import './Main.css';
import './Main.custom.sass';

export default function Main() {
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
