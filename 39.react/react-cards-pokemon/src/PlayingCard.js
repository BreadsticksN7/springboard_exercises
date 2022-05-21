import React from "react";
import backOfCard from "./back.png";
import "./PlayingCard.css";

import { useFlip } from "./hooks";

function PlayingCard({ front, back = backOfCard }) {
  const [isFacingUp, flip] = useFlip();
  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={flip}
      className="PlayingCard Card"
    />
  );
}



export default PlayingCard;
