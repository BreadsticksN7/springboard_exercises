import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NewCard from './NewCard';
import './NewDeck.css';

const CARD_API = "http://deckofcardsapi.com/api/deck/";

function NewDeck() {
  const [ deck, setDeck ] = useState(null);
  const [ draw, setDraw ] = useState([]);
  const [ newDeck, setNewDeck ] = useState(false);
  const timerRef = useRef(null);


  useEffect(function fetchDeck() {
    async function fetchCard() {
      const deckRes = await axios.get(`${CARD_API}/new/shuffle`);
      setDeck(deckRes.data);
    }
    fetchCard();
  }, [setDeck]);

  useEffect(() => {
    async function getCard() {
      let { deck_id } = deck;
      try {
        let cardRes = await axios.get(`${CARD_API}/${deck_id}/draw`);
        if (cardRes.data.remaining === 0) {
          setNewDeck(false);
          throw new Error("No cards left");
        }
        
        const card = cardRes.data.cards[0];
        setDraw(d => [
          ...d,
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image
          }
        ]);
      } catch (err) {
        alert(err);
      }
    }

    if (newDeck && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [newDeck, setNewDeck, deck]);

  const toggleAutoDraw = () => {
    setNewDeck(auto => !auto);
  };

  const cards = draw.map(c => (
    <NewCard key={c.id} name={c.name} image={c.image}/>
  ))
  return (
    <div className="Deck">
      {deck ? (
        <button className="Deck-gimme" onClick={toggleAutoDraw}>
          {newDeck ? "Stop" : "Draw!"}
        </button>
      ) : null}
      <div className="Deck-cardarea">{cards}</div>
    </div>
  );
}

export default NewDeck;