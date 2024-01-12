/*

The SetView component handles the main UI for the user to study their flash cards
URL matching /baseUrl/sets/:setID:

*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import setService from "../../../services/sets";

import { Sidebar, SidebarMobile } from "../../reusable/Sidebar.elements";
import { Wrapper } from "./SetView.elements.js";

import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import {useError, useErrorUpdate} from "../../../context.js"

import ErrorModal from "../ErrorPage/ErrorModal.jsx";

export default function SetView(props) {
  const [flipped, setFlipped] = useState(false); // false: term is showing, true: definition is showing
  const [hasFlipped, setHasFlipped] = useState(false); // has the user flipped this card after navigating to it yet?
  const [currentSet, setCurrentSet] = useState({
    setTitle: null,
    setDesc: null,
    setCards: []
  });
  const [cardIndex, setCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const currLoc = useParams(); // {setId: int}
  const navigate = useNavigate();

  const errObj = useError();
  const errObjUpdate = useErrorUpdate();

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const flipCurrentCard = () => {
    setFlipped(prevState => !prevState);
    setHasFlipped(true);
  };

  const nextCard = () => {
    setCardIndex(prevState => (prevState + 1) % currentSet.setCards.length);
    setFlipped(false);
    setHasFlipped(false);
  };

  const prevCard = () => {
    setCardIndex(
      prevState => (prevState - 1 + currentSet.setCards.length) % currentSet.setCards.length
    );
    setFlipped(false);
    setHasFlipped(false);
  };

  useEffect(() => {
    const getUserSet = async () => {
      try {
        const set = await setService.getUserSetById(currLoc.setid);
        console.log(set)
        setCurrentSet(set);
        setLoading(false);
      } catch (err) {
        // redirect to error page after updating status and message

        const errorStr = err.response.data.error.split("|")

        const errStatus = errorStr[0];
        const errMsg = errorStr[1];

        console.log(err)
        
        errObjUpdate({status: errStatus, message: errMsg});
        setError(true)
        setLoading(false)
        
        // navigate(0)

      }
      
    };
    getUserSet();
  }, []);

  return (
    <>{error && <ErrorModal></ErrorModal>}
    <Wrapper className={loading || error ? "loading" : ""}>
      <div className={` ${loading ? "loading-spinner-container" : ""}`}>
        <Oval
          visible={loading}
          height="200"
          width="200"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          className="spinner"
        />
      </div>

      

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
          <div className="sidebar__group__el--m2" onClick={navigateToDashboard}>
            Dashboard
          </div>
          <div className="sidebar__group__el--m2">Reset progress</div>
        </div>
      </Sidebar>

      <div className="main">
        <div className="set-info">
          <span>{currentSet.setTitle}</span>
          <span>
            0/<span data-testid="set-card-count">{currentSet.setCards.length}</span> terms mastered
          </span>
        </div>
        {/* only want the flipped-reverse class applied when the user first flips over the card
            otherwise the animation wrongly plays on card navigation
        */}
        <div
          className={`card ${flipped ? "flipped" : ""} ${
            !flipped && hasFlipped ? "flipped-reverse" : ""
          }`}
          onClick={flipCurrentCard}
          data-testid="card"
        >
          <div className="card-inner">
            <div className="card-front">
              <span data-testid={`card-term${flipped ? "-hidden" : ""}`}>
                {!loading && !error && currentSet.setCards[cardIndex].term}
              </span>
            </div>
            <div className="card-back">
              <span data-testid={`card-definition${flipped ? "" : "-hidden"}`}>
                {!loading && !error && currentSet.setCards[cardIndex].definition}
              </span>
            </div>
          </div>
        </div>
        <div className="controls-count">
          <FaLongArrowAltLeft className="control" onClick={prevCard} data-testid="navigate-prev" />
          <strong className="count">
            {cardIndex + 1}/{!loading && currentSet.setCards.length}
          </strong>
          <FaLongArrowAltRight className="control" onClick={nextCard} data-testid="navigate-next" />
        </div>
      </div>
    </Wrapper>
    </>
  );
  
}
