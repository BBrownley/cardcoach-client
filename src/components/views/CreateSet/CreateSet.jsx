/*
  The CreateSet view is responsible for providing UI for creating new
  flashcard Sets.
*/

import React from "react";

import { Container, ImportTermsButton } from "./CreateSet.elements";
import { Sidebar } from "../../reusable/Sidebar.elements";
import { Wrapper } from "../../reusable/Wrapper.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function CreateSet() {
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
                <input type="text" id="set-title" />
              </div>
              <div className="field">
                <label htmlFor="set-description">Description</label>
                <textarea type="text" id="set-description" />
              </div>
            </div>
            <div className="inputs-right">
              <ImportTermsButton>
                <FontAwesomeIcon icon={faPlusCircle} className="button-icon" />
                <span className="button-label">Import terms</span>
              </ImportTermsButton>
              <div className="field">
                <label htmlFor="set-import">Import</label>
                <textarea type="text" id="set-import" />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </Container>
  );
}
