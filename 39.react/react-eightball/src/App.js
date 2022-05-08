import logo from './logo.svg';
import './App.css';

import Eightball from './Eightball';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Eightball />
      </header>
    </div>
  );
}

export default App;
