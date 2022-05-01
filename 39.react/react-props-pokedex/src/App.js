import './App.css';
import PokeDex from './pokedex';
import Pokemon from './pokemon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PokeDex pokemon={Pokemon} />
      </header>
    </div>
  );
}

export default App;
