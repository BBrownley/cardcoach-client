/*
  The CreateSet view is responsible for providing UI for creating new
  flashcard Sets.
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, ImportTermsButton } from "./CreateSet.elements";
import { Sidebar, SidebarMobile } from "../../reusable/Sidebar.elements";
import { Wrapper } from "../../reusable/Wrapper.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import ImportTermsTextArea from "./ImportTermsTextArea/ImportTermsTextArea";

import SetCards from "./SetCards/SetCards";

import setsService from "../../../services/sets";

export default function CreateSet() {
  const navigate = useNavigate();

  // Card set title and desc
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ID that will be assigned to the next created card
  const [cardCreationID, setCardCreationID] = useState(2);

  // Proposed set of cards to be created
  const [cards, setCards] = useState([{ id: 1, term: "", definition: "" }]);

  // textarea input for ImportTermsTextArea component
  const [termsInput, setTermsInput] = useState("");

  // Array of term objects to be imported from ImportTermsTextArea component
  const [termsToImport, setTermsToImport] = useState([]);

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
    setCards(cards.map(card => (card.id === updateID ? { ...card, term: updatedTerm } : card)));
  };

  const handleDefinitionUpdate = (updateID, updatedDefinition) => {
    setCards(
      cards.map(card => (card.id === updateID ? { ...card, definition: updatedDefinition } : card))
    );
  };

  /**
   * Deletes a card from the set
   */
  const deleteCard = deletionID => {
    setCards(cards.filter(card => card.id !== deletionID));
  };

  /**
   * Imports terms from the ImportTermsTextArea into the set creation
   */
  const importTerms = async () => {
    const termsIDMapped = termsToImport.map((term, index) => {
      return { ...term, id: cardCreationID + index };
    });

    setTermsToImport(termsIDMapped);
    setCardCreationID(termsIDMapped.length + cardCreationID);

    // if only one card is in the set and blank, remove it
    // (we're assuming the user is importing all their terms from the textarea and not using the
    // provided initial, blank card)

    if (cards.length === 1 && cards[0].term.trim() === "" && cards[0].definition.trim() === "") {
      setCards([...termsIDMapped]);
    } else {
      setCards([...cards, ...termsIDMapped]);
    }

    // clear import state
    setTermsToImport([]);
    setTermsInput("");

    setTimeout(function() {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }, 200);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const createSet = async () => {
    const res = await setsService.create(title, description, cards);
    if (res?.error) {
      console.log(res.error); // TODO: generate error toast
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Container>
      <Sidebar>
        <div className="sidebar__group active">Create flashcard set</div>
        <div className="sidebar__group sidebar__group--space-around">
          <button onClick={createSet}>Create</button>
          <button onClick={goToDashboard}>Cancel</button>
        </div>
        <div className="sidebar__group">Skip mastered terms: On</div>
        <div className="sidebar__group">Mastery level req.: 10</div>
      </Sidebar>
      <SidebarMobile>
        <div className="sidebar__group sidebar__group--space-around">
          <button className="create" onClick={createSet}>
            Create
          </button>
          <button onClick={goToDashboard}>Cancel</button>
        </div>
        <div className="sidebar__group">
          <div className="skip-mastered-terms">Skip mastered terms: On</div>
          <div>Mastery level req.: 10</div>
        </div>
      </SidebarMobile>
      <div className="main">
        <Wrapper>
          <div className="inputs">
            <div className="inputs-left">
              <div className="field">
                <label htmlFor="set-title">Title</label>
                <input
                  type="text"
                  id="set-title"
                  data-testid="set-title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="set-description">Description</label>
                <textarea
                  type="text"
                  id="set-description"
                  data-testid="set-description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="inputs-right">
              <ImportTermsButton onClick={importTerms}>
                <FontAwesomeIcon icon={faPlusCircle} className="button-icon" />
                <span className="button-label">Import terms</span>
              </ImportTermsButton>
              <div className="field">
                <label htmlFor="set-import" data-testid="detected-terms-label">
                  Import ({termsToImport.length} terms found)
                </label>
                <ImportTermsTextArea
                  setTermsToImport={setTermsToImport}
                  termsInput={termsInput}
                  setTermsInput={setTermsInput}
                />
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
