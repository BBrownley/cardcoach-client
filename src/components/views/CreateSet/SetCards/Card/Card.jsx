import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";

import { Container } from "./Card.elements";

export default function Card(props) {
  const { id, term, definition, updateTermInSet, updateDefInSet } = props;

  const [cardTerm, setCardTerm] = useState(term);
  const [cardDefinition, setCardDefinition] = useState(definition);

  /**
   * Updates the state of this Card component along with its parent SetCards to reflect the change
   * @param updatedTerm - The updated term
   */
  const handleTermChange = updatedTerm => {
    // update current child state
    setCardTerm(updatedTerm);

    // update parent state (set of all cards)
    updateTermInSet(id, updatedTerm);
  };

  const handleDefinitionChange = updatedDefinition => {
    // update current child state
    setCardDefinition(updatedDefinition);

    // update parent state (set of all cards)
    updateDefInSet(id, updatedDefinition);
  };

  return (
    <Container id={id}>
      <div className="card-top">
        <div className="card-top__order">{id}</div>
        <div className="card-top__right">
          <div className="mastery-level">
            2/10 <FontAwesomeIcon icon={faStar} className="star-icon" />
          </div>
          <div className="delete">
            <FontAwesomeIcon icon={faTrash} className="delete-icon" />
          </div>
        </div>
      </div>
      <div className="card-main">
        <div className="card-main__term">
          <label htmlFor={`term${id}`}>Term</label>
          <input
            type="text"
            id={`term${id}`}
            value={cardTerm}
            onChange={e => handleTermChange(e.target.value)}
          />
        </div>

        <div className="card-main__definition">
          <label htmlFor={`definition${id}`} className="label">
            Definition
          </label>
          <textarea
            id={`definition${id}`}
            cols="30"
            rows="10"
            value={cardDefinition}
            onChange={e => handleDefinitionChange(e.target.value)}
          ></textarea>
        </div>
      </div>
    </Container>
  );
}
