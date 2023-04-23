import React from "react";

import { Hero } from "./Hero.elements";
import { Wrapper } from "../../reusable/Wrapper.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

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
          <div className="hero-image-wrapper">
            <div className="hero-image">
              Lorem ipsum dolor sit amet aq r rtarf awr awrawr
            </div>
          </div>
        </Hero>
      </Wrapper>
    </div>
  );
}
