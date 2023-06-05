import React, { useState } from "react";
import { Container } from "./SetCards.elements";

import Card from "./Card/Card";

export default function SetCards(props) {
  const {
    cards,
    addNewCard,
    handleSetUpdate,
    deleteCard,
    handleDefinitionUpdate
  } = props;

  const printSet = () => {
    console.log(cards);
  };

  return (
    <Container>
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

      <button className="btn btn-primary add-card-btn" onClick={addNewCard}>
        + Add new card
      </button>
      <div onClick={printSet}>print set</div>
    </Container>
  );
}
