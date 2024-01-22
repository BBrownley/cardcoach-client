/*
  The CreateSet view is responsible for providing UI for creating new
  flashcard Sets.
*/

import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, ImportTermsButton } from "./CreateSet.elements";
import { Sidebar, SidebarMobile } from "../../reusable/Sidebar.elements";
import { Wrapper } from "../../reusable/Wrapper.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import ImportTermsTextArea from "./ImportTermsTextArea/ImportTermsTextArea";

import SetCards from "./SetCards/SetCards";

import setsService from "../../../services/sets";

import { useEditMode, useEditModeUpdate, useEditSetState } from "../../../context";

export default function CreateSet() {
  const navigate = useNavigate();
  const updateEditMode = useEditModeUpdate();

  // Card set title and desc
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ID that will be assigned to the next created card
  const [cardCreationID, setCardCreationID] = useState(2);

  /*
    Design problem: How do we ensure that any new cards submitted to the backend do not contain
    duplicate card IDs? - Just using this default creation ID will almost guarantee duplication at some point

    So we need some way to give newly created cards a unique ID while in edit mode

    note: while in create mode, the backend ignores frontend-assigned IDs in favor of SQL auto-assigned value
          in edit mode, we must use the backend-provided IDs for a more efficient query

    ---

    One solution would be to assign a "new" property to any newly created cards in edit mode, and set it to true.
    We will have the backend read in this property, and have the database assign an auto-assigned ID if "new"

  */

  // Proposed set of cards to be created
  const [cards, setCards] = useState([{ id: 1, term: "", definition: "" }]);

  // textarea input for ImportTermsTextArea component
  const [termsInput, setTermsInput] = useState("");

  // Array of term objects to be imported from ImportTermsTextArea component
  const [termsToImport, setTermsToImport] = useState([]);

  // determines if the form is in edit mode
  const editing = useEditMode();

  // the original state of the set before opening this view in edit mode
  const originalSetBeforeEdit = useEditSetState();

  useEffect(() => {
    // prepopulate input fields if in edit mode
    if (editing) {
      setTitle(originalSetBeforeEdit.setTitle);
      setDescription(originalSetBeforeEdit.setDesc);
      setCards(originalSetBeforeEdit.setCards);
      setCardCreationID(originalSetBeforeEdit.setCards[originalSetBeforeEdit.setCards.length - 1].id + 1);
    }
  }, [])

  /**
   * Adds a new, blank card to the set
   */
  const addNewCard = () => {

    const cardToAdd = { id: cardCreationID, term: "", definition: "" };

    if (editing) { 
      // if form is in edit mode
      // assign a "new" property to differentiate between cards to be replaced in DB and completely new cards
      cardToAdd["new"] = true; 
    }

    setCards([...cards, cardToAdd]);
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
    console.log(cards)
    console.log(deletionID)
    setCards(cards.filter(card => card.id !== deletionID));
    console.log(cards)
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

  const cancel = () => {
    updateEditMode(false); // reset edit mode to false, the default value
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

  const submitEditSet = async () => {

    const setId = originalSetBeforeEdit.setId;

    const res = await setsService.updateSet(title, description, cards, setId);
    if (res?.error) {
      console.log(res.error); // TODO: generate error toast
    } else {
      navigate(`/dashboard/${setId}`);
    }
  }

  return (
    <Container>
      <Sidebar>
        <div className="sidebar__group active">{editing ? "Edit" : "Create"} flashcard set</div>
        <div className="sidebar__group sidebar__group--space-around">
          <button onClick={editing ? submitEditSet : createSet} data-testid="submit-set">{editing ? "Update" : "Create"}</button>
          <button onClick={cancel}>Cancel</button>
        </div>
        <div className="sidebar__group">Skip mastered terms: On</div>
        <div className="sidebar__group">Mastery level req.: 10</div>
      </Sidebar>
      <SidebarMobile>
        <div className="sidebar__group sidebar__group--space-around">
          <button className="create" onClick={createSet}>
            Create
          </button>
          <button onClick={cancel}>Cancel</button>
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
