/* 
  The Set component represents a user's flashcard Set in the Dashboard view. Users will be able to 
  display information about each Set, including its title, # of terms,
  and overall mastery progress
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import ProgressBar from "@ramonak/react-progress-bar";

import React from "react";

import { Container } from "./Set.elements";

export default function Set(props) {
  const { title, description, totalTerms, mastered } = props.set;

  // goes into the flashcard set for user to begin studying from it
  const goToSet = () => {
    console.log("opening set");
  };

  return (
    <Container onClick={goToSet}>
      <div className="title-desc">
        <div className="title">{title}</div>
        <div className="desc">{description}</div>
      </div>
      <div className="term-count">{totalTerms} terms</div>
      <div className="progress">
        {" "}
        <FontAwesomeIcon icon={faStar} className="progress__star" />
        <ProgressBar
          completed={mastered}
          bgColor="#D9D9D9"
          height="1.25rem"
          baseBgColor="#777777"
          labelColor="#6e7faa"
          maxCompleted={totalTerms}
          customLabel={mastered}
          className="progress__bar"
        />
      </div>
    </Container>
  );
}
