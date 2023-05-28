import React, { useState } from "react";

import Card from "./Card/Card";

export default function SetCards() {
  const [cards, setCards] = useState([
    { id: 1, term: "termA", definition: "defA" },
    { id: 2, term: "termB", definition: "defB" },
    { id: 3, term: "termC", definition: "defC" }
  ]);

  /**
   * Updates the state of the cards in the set. Uses the ID passed in as a param
   * to determine which card needs to be updated
   */
  const handleSetUpdate = (updateID, updatedTerm) => {
    setCards(
      cards.map(card =>
        card.id === updateID ? { ...card, term: updatedTerm } : card
      )
    );
  };

  const handleDefinitionUpdate = (updateID, updatedDefinition) => {
    setCards(
      cards.map(card =>
        card.id === updateID ? { ...card, definition: updatedDefinition } : card
      )
    );
  };

  const printSet = () => {
    console.log(cards);
  };

  return (
    <div>
      {cards.map((card, index) => {
        return (
          <Card
            id={index + 1}
            updateTermInSet={handleSetUpdate}
            updateDefInSet={handleDefinitionUpdate}
            term={card.term}
            definition={card.definition}
          />
        );
      })}

      <div onClick={printSet}>print set</div>
    </div>
  );
}
