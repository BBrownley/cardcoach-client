import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container } from "./Navigation.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

import StyledLink from "../elements.elements";

export default function Navigation() {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // cleanup fcn
  });

  function openSearchMobile() {
    if (deviceWidth <= 1060) {
      console.log("open search screen");
    }
  }

  function openMenuMobile() {
    if (deviceWidth <= 700) {
      console.log("open hamburger menu");
    }
  }

  return (
    <Container>
      <StyledLink className="branding">
        <div>
          <span className="clr-primary">C</span>
          <span className="branding-blk-text">ard</span>
          <span className="clr-primary">C</span>
          <span className="branding-blk-text">oach</span>
        </div>
      </StyledLink>
      <div className="nav-links">
        <Link to="/subjects">Create Deck</Link>
        <div className="search-container">
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={openSearchMobile}
          />
          <input
            type="text"
            placeholder="What would you like to study today?"
            id="search"
          ></input>
        </div>
      </div>
      <div className="login-register">
        <button className="btn btn-secondary">Login</button>
        <button className="btn btn-primary">Register</button>
      </div>
      <div className="hamburger-menu">
        <FontAwesomeIcon
          icon={faBars}
          className="bars-icon"
          onClick={openMenuMobile}
        />
      </div>
    </Container>
  );
}
