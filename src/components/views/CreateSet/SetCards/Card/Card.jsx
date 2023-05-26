import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";

import { Container } from "./Card.elements";

export default function Card(props) {
  const { order } = props;

  return (
    <Container id={props.order}>
      <div className="card-top">
        <div className="card-top__order">{order}</div>
        <div className="card-top__right">
          <div className="mastery-level">2/10 <FontAwesomeIcon icon={faStar} className="star-icon" /></div>
          <div className="delete">
            <FontAwesomeIcon icon={faTrash} className="delete-icon" />
          </div>
        </div>
      </div>
      <div className="card-main">
        <div className="card-main__term">
          <label htmlFor={`term${order}`}>Term</label>
          <input type="text" id={`term${order}`} />
        </div>

        <div className="card-main__definition">
          <label htmlFor={`definition${order}`} className="label">
            Definition
          </label>
          <textarea id={`definition${order}`} cols="30" rows="10"></textarea>
        </div>
      </div>
    </Container>
  );
}
