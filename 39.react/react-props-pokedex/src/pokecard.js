import React from 'react';
import './pokecard.css';



const PokeCard = ({ id, name, type, exp}) => (
    <div className='PokeCard'>
      <div className='PokeCard-name'>{name}</div>
      <div className='PokeCard-image'><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt=""></img></div>
      <div className='PokeCard-type'>Type: {type}</div>
      <div className='PokeCard-exp'>EXP: {exp}</div>
    </div>
)


export default PokeCard;