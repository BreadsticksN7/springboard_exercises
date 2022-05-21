import React from "react";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

import { useAxios } from "./hooks";
import { formatCard } from './helpers';

function CardTable() {
  const [cards, addCard, clearCards] = useAxios("cards", "https://deckofcardsapi.com/api/deck/new/draw/");

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard(formatCard)}>Add a playing card!</button>
        <button onClick={clearCards}>Clear cards!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(card => (
          <PlayingCard key={card.id} front={card.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
