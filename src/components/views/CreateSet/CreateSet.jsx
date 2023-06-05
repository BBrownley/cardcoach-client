/*
  The CreateSet view is responsible for providing UI for creating new
  flashcard Sets.
*/

import React, { useState, useEffect } from "react";

import { Container, ImportTermsButton } from "./CreateSet.elements";
import { Sidebar } from "../../reusable/Sidebar.elements";
import { Wrapper } from "../../reusable/Wrapper.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import ImportTermsTextArea from "./ImportTermsTextArea/ImportTermsTextArea";

import SetCards from "./SetCards/SetCards";

export default function CreateSet() {
  // Card set title and desc
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Proposed set of cards to be created
  const [cards, setCards] = useState([
    { id: 1, term: "termA", definition: "defA" },
    { id: 2, term: "termB", definition: "defB" },
    { id: 3, term: "termC", definition: "defC" }
  ]);

  // Array of term objects to be imported from ImportTermsTextArea component
  const [termsToImport, setTermsToImport] = useState([]);

  // ID that will be assigned to the next created card
  const [cardCreationID, setCardCreationID] = useState(4);

  /**
   * Adds a new, blank card to the set
   */
  const addNewCard = () => {
    setCards([...cards, { id: cardCreationID, term: "", definition: "" }]);
    setCardCreationID(cardCreationID + 1);

    // scroll to bottom after a short delay

    setTimeout(function() {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }, 200);
  };

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
   * Deletes a card from the set
   */
  const deleteCard = deletionID => {
    setCards(cards.filter(card => card.id !== deletionID));
  };

  return (
    <Container>
      <Sidebar>
        <div className="sidebar__group active">Create flashcard set</div>
        <div className="sidebar__group sidebar__group--space-around">
          <button>Create</button>
          <button>Cancel</button>
        </div>
        <div className="sidebar__group">Skip mastered terms: On</div>
        <div className="sidebar__group">Mastery level req.: 10</div>
      </Sidebar>
      <div className="main">
        <Wrapper>
          <div className="inputs">
            <div className="inputs-left">
              <div className="field">
                <label htmlFor="set-title">Title</label>
                <input
                  type="text"
                  id="set-title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="set-description">Description</label>
                <textarea
                  type="text"
                  id="set-description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="inputs-right">
              <ImportTermsButton>
                <FontAwesomeIcon icon={faPlusCircle} className="button-icon" />
                <span className="button-label">Import terms</span>
              </ImportTermsButton>
              <div className="field">
                <label htmlFor="set-import">
                  Import ({termsToImport.length} terms found)
                </label>
                <ImportTermsTextArea setTermsToImport={setTermsToImport} />
              </div>
            </div>
          </div>
          <SetCards
            cards={cards}
            addNewCard={addNewCard}
            handleSetUpdate={handleSetUpdate}
            deleteCard={deleteCard}
            handleDefinitionUpdate={handleDefinitionUpdate}
          />
        </Wrapper>
      </div>
    </Container>
  );
}
