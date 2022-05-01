import React from 'react';
import PokeCard from './pokecard';
import './pokedex.css';

const PokeDex = ({ pokemon }) => {
  return (
    <div className='PokeDex'>
      <h1 className='PokeDex-title'>Pokedex</h1>
        <div className='PokeDex-cards'>
        {pokemon.map(i => (
          <div key={i.id}>
            <PokeCard id={i.id} name={i.name} type={i.type} exp={i.base_experience} />
          </div>
        ))}
        </div>
    </div>
  )
}


export default PokeDex;