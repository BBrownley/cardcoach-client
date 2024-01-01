/*

The SetView component handles the main UI for the user to study their flash cards
URL matching /baseUrl/sets/:setID:

*/

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarMobile } from "../../reusable/Sidebar.elements";
import { Wrapper } from "./SetView.elements.js";

import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

export default function SetView(props) {
  const [flipped, setFlipped] = useState(false); // false: term is showing, true: definition is showing

  const flipCurrentCard = () => {
    setFlipped(prevState => !prevState);
  };

  return (
    <Wrapper>
      <Sidebar className="spaced">
        <div className="sidebar__group">
          <div className="sidebar__group__el--m2">Add flashcard</div>
          <div className="sidebar__group__el--m2">Shuffle set</div>
          <div className="sidebar__group__el--m2">Matching mode</div>
        </div>
        <div className="sidebar__group">
          <div className="sidebar__group__el--m2">Skip mastered terms: On</div>
        </div>
        <div className="sidebar__group">
          <div className="sidebar__group__el--m2">Reset progress</div>
        </div>
      </Sidebar>

      <div className="main">
        <div className="set-info">
          <span>Computer Architecture and Operating Systems Management</span>
          <span>0/38 terms mastered</span>
        </div>
        <div className={`card ${flipped ? "flipped" : ""}`} onClick={flipCurrentCard}>
          <div className="card-inner">
            <div className="card-front">
              <span>Dynamic RAM</span>
            </div>
            <div className="card-back">
              <span>definition</span>
            </div>
          </div>
        </div>
        <div className="controls-count">
          <FaLongArrowAltLeft className="control" />
          <strong className="count">1/47</strong>
          <FaLongArrowAltRight className="control" />
        </div>
      </div>
    </Wrapper>
  );
}
