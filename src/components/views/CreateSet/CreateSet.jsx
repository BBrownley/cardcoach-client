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

export default function CreateSet() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [termsToImport, setTermsToImport] = useState([]); // Array of term objects to be imported from ImportTermsTextArea component

  useEffect(() => {
    console.log(termsToImport);
    console.log(title);
    console.log(description);
  }, [termsToImport, title, description]);

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
        </Wrapper>
      </div>
    </Container>
  );
}
