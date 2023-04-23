import React, { useState, useEffect } from "react";

import { Hero } from "./Hero.elements";
import { Wrapper } from "../../reusable/Wrapper.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faSquareRootVariable,
  faFlaskVial,
  faGlobeAmericas
} from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  return (
    <div>
      <Wrapper className="m-top">
        <Hero>
          <div className="hero-body-wrapper">
            <div className="hero-body">
              <span className="clr-primary">CardCoach</span> is a simple and
              user-friendly flashcard app that helps users easily create and
              study custom flashcards on any topic.
              <button className="btn btn-primary">
                Let's start!{" "}
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className="btn__arrow"
                />
              </button>
            </div>
          </div>

          <div className="hero-image">
            <div className="card-1 animate">
              <FontAwesomeIcon
                icon={faSquareRootVariable}
                className="card-icon"
              />
            </div>
            <div className="card-2 animate">
              <FontAwesomeIcon icon={faFlaskVial} className="card-icon" />
            </div>
            <div className="card-3 animate">
              <FontAwesomeIcon icon={faGlobeAmericas} className="card-icon" />
            </div>
          </div>
        </Hero>
      </Wrapper>
    </div>
  );
}
