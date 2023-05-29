import React, { useState } from "react";

import Card from "./Card/Card";

export default function SetCards() {
  const [cards, setCards] = useState([
    { id: 1, term: "termA", definition: "defA" },
    { id: 2, term: "termB", definition: "defB" },
    { id: 3, term: "termC", definition: "defC" }
  ]);

  const [currentID, setCurrentID] = useState(4);

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

  /**
   * Adds a new, blank card to the set
   */
  const addNewCard = () => {
    setCards([...cards, { id: currentID, term: "", definition: "" }]);
    setCurrentID(currentID + 1);
  };

  /**
   * Deletes a card from the set
   */
  const deleteCard = deletionID => {
    console.log(deletionID);
    console.log(cards.filter(card => card.id !== deletionID));
    setCards(cards.filter(card => card.id !== deletionID));
  };

  const printSet = () => {
    console.log(cards);
  };

  return (
    <div>
      {cards.map((card, index) => {
        return (
          <Card
            key={card.id}
            id={card.id}
            order={index + 1}
            updateTermInSet={handleSetUpdate}
            updateDefInSet={handleDefinitionUpdate}
            deleteCard={deleteCard}
            term={card.term}
            definition={card.definition}
          />
        );
      })}

      <div onClick={printSet}>print set</div>
      <div onClick={addNewCard}>add new card</div>
    </div>
  );
}
