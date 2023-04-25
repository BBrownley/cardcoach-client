import React, { useState, useEffect, useRef } from "react";

import { Hero } from "./Hero.elements";
import { Features } from "./Features.elements";
import { Wrapper } from "../../reusable/Wrapper.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faSquareRootVariable,
  faFlaskVial,
  faGlobeAmericas,
  faGear,
  faFileLines,
  faPeopleGroup,
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  const featuresRef = useRef(null);

  // true if features section has been scrolled to
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    // IntersectionObserver observes an HTML element for intersection changes
    const observer = new IntersectionObserver(
      ([entry]) => {
        // ([entry]) gets the first element (array destructuring)
        setFeaturesVisible(featuresVisible || entry.isIntersecting);
      },
      {
        root: null, // element used to check for visibility. null -> default to viewport
        // fire when el extends 240px past bottom edge of viewport
        rootMargin: "0px 0px -240px 0px",
        threshold: 0 // % of element visible needed for the callback to be invoked.
      }
    );

    if (featuresRef.current) {
      // observes ref for viewport intersection.
      // sort of like attaching an eventListener to featuresRef
      observer.observe(featuresRef.current);
    }
  }, [featuresRef, featuresVisible]);

  return (
    <div>
      <Wrapper>
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

      <Wrapper>
        <Features
          ref={featuresRef}
          className={`${featuresVisible ? "animate" : "hidden"}`}
        >
          <h2>Features</h2>
          <div className="features-container">
            <div className="feature">
              <h3>
                <FontAwesomeIcon icon={faGear} className="feature-icon" />
                <span>Create custom flashcards</span>
              </h3>
              <p className="feature-description">
                With CardCoach, users can easily create custom flashcards on any
                topic. They can add text, images, and audio to their cards to
                create rich, engaging study materials that are tailored to their
                specific learning needs.
              </p>
            </div>

            <div className="feature">
              <h3>
                <FontAwesomeIcon icon={faFileLines} className="feature-icon" />
                <span>Review with multiple modes</span>
              </h3>
              <p className="feature-description">
                CardCoach offers multiple review modes to suit different
                learning styles. Users can choose from quiz mode, flip mode, and
                matching mode to study their flashcards in a way that works best
                for them.
              </p>
            </div>

            <div className="feature">
              <h3>
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="feature-icon"
                />
                <span>Share and collaborate with others</span>
              </h3>
              <p className="feature-description">
                CardCoach makes it easy for users to share their flashcard decks
                with friends, classmates, or study groups. With the app's
                sharing feature, users can collaborate on decks, track progress,
                and support each other in their learning journeys.
              </p>
            </div>

            <div className="feature">
              <h3>
                <FontAwesomeIcon icon={faLightbulb} className="feature-icon" />
                <span>Spaced Repetition</span>
              </h3>
              <p className="feature-description">
                CardCoach uses a spaced repetition algorithm to help users learn
                and retain information more efficiently by presenting flashcards
                at increasing intervals based on the user's performance.
              </p>
            </div>
          </div>
        </Features>
      </Wrapper>
    </div>
  );
}

// import { useState, useEffect, useRef } from 'react';

// function MyComponent() {
//   const elementRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.5,
//       }
//     );
//     if (elementRef.current) {
//       observer.observe(elementRef.current);
//     }
//     return () => {
//       if (elementRef.current) {
//         observer.unobserve(elementRef.current);
//       }
//     };
//   }, [elementRef]);

//   return (
//     <div
//       ref={elementRef}
//       className={`my-element ${isVisible ? 'is-visible' : ''}`}
//     >

//     </div>
//   );
// }
