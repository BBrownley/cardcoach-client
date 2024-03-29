import React, { useState, useEffect, useRef } from "react";

import { Hero, HeroWrapper } from "./Hero.elements";
import { Features, FeaturesWrapper } from "./Features.elements";
import { WhyUs, WhyUsWrapper } from "./WhyUs.elements";
import { SignUp } from "./SignUp.elements";
import StyledLink from "../../reusable/elements.elements";

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

import heroBkg from "../../../assets/svg/wave-haikei.svg";

export default function LandingPage() {
  const featuresRef = useRef(null);

  // true if features section has been scrolled to
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    // IntersectionObserver observes an HTML element for intersection changes
    const observer = new IntersectionObserver(
      ([entry]) => {
        // ([entry]) gets the first element (array destructuring)

        if (entry.isIntersecting) {
          setFeaturesVisible(true);
        }
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

    return () => {
      // Clean up the observer when the component is unmounted
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <Hero>
        <HeroWrapper>
          <svg className="hero-bkg">
            <image href={heroBkg} preserveAspectRatio="none" />
          </svg>

          <div className="hero-body">
            <span class="clr-primary">CardCoach</span> is a simple and user-friendly flashcard app
            that helps users easily create and study custom flashcards on any topic.
            <button className="btn btn-primary">
              Let's start! <FontAwesomeIcon icon={faArrowRightLong} className="btn__arrow" />
            </button>
          </div>

          <div className="hero-image">
            <div className="card-1 animate">
              <FontAwesomeIcon icon={faSquareRootVariable} className="card-icon" />
            </div>
            <div className="card-2 animate">
              <FontAwesomeIcon icon={faFlaskVial} className="card-icon" />
            </div>
            <div className="card-3 animate">
              <FontAwesomeIcon icon={faGlobeAmericas} className="card-icon" />
            </div>
          </div>
        </HeroWrapper>
      </Hero>

      <Features>
        <FeaturesWrapper ref={featuresRef} className={`${featuresVisible ? "animate" : "hidden"}`}>
          <h2>Features</h2>
          <div className="features-container">
            <div className="feature">
              <h3>
                <FontAwesomeIcon icon={faGear} className="feature-icon" />
                <span>Create custom flashcards</span>
              </h3>
              <p className="feature-description">
                With CardCoach, users can easily create custom flashcards on any topic. They can add
                text, images, and audio to their cards to create rich, engaging study materials that
                are tailored to their specific learning needs.
              </p>
            </div>

            <div className="feature">
              <h3>
                <FontAwesomeIcon icon={faFileLines} className="feature-icon" />
                <span>Review with multiple modes</span>
              </h3>
              <p className="feature-description">
                CardCoach offers multiple review modes to suit different learning styles. Users can
                choose from quiz mode, flip mode, and matching mode to study their flashcards in a
                way that works best for them.
              </p>
            </div>

            <div className="feature">
              <h3>
                <FontAwesomeIcon icon={faPeopleGroup} className="feature-icon" />
                <span>Share and collaborate with others</span>
              </h3>
              <p className="feature-description">
                CardCoach makes it easy for users to share their flashcard decks with friends,
                classmates, or study groups. With the app's sharing feature, users can collaborate
                on decks, track progress, and support each other in their learning journeys.
              </p>
            </div>

            <div className="feature">
              <h3>
                <FontAwesomeIcon icon={faLightbulb} className="feature-icon" />
                <span>Spaced Repetition</span>
              </h3>
              <p className="feature-description">
                CardCoach uses a spaced repetition algorithm to help users learn and retain
                information more efficiently by presenting flashcards at increasing intervals based
                on the user's performance.
              </p>
            </div>
          </div>
        </FeaturesWrapper>
      </Features>

      <WhyUs>
        <WhyUsWrapper>
          <h2>Why CardCoach?</h2>
          <div className="main-content">
            <div className="description">
              <span className="clr-primary"></span>
              CardCoach is a unique study tool that offers several advantages over traditional
              note-taking methods. Unlike notes, CardCoach helps users retain information more
              effectively by using a{" "}
              <span className="clr-primary">
                spaced repetition algorithm that optimizes learning
              </span>
              . The platform also offers interactive features such as{" "}
              <span className="clr-primary">flashcards, quizzes, and progress tracking</span> to
              keep users engaged and motivated. Additionally, CardCoach allows users to easily share
              their decks with friends or classmates, making it an ideal tool for{" "}
              <span className="clr-primary">collaborative studying</span>. With its intuitive
              interface and customizable settings, CardCoach is an efficient and effective way to
              study and learn. Whether you're preparing for an exam or simply seeking to deepen your
              knowledge on a subject, CardCoach can help you{" "}
              <span className="clr-primary">achieve your learning goals with ease</span>.
            </div>
            <div className="studying-image"></div>
          </div>
        </WhyUsWrapper>
      </WhyUs>

      <SignUp>
        <StyledLink to="/register" className="signup-cta__link">
          Sign up
        </StyledLink>{" "}
        for CardCoach today and start acing your exams!
      </SignUp>
    </div>
  );
}
