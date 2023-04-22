import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container } from "./Navigation.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faClose } from "@fortawesome/free-solid-svg-icons";

import StyledLink from "../elements.elements";

export default function Navigation() {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  // prevent hamburger menu icon from animating upon its render
  const [animateHBGMenuIcon, setAnimateHBGMenuIcon] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);

      if (deviceWidth > 550) {
        setAnimateHBGMenuIcon(false);
        setHamburgerMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // cleanup fcn
  });

  function openSearchMobile() {
    setSearchMenuOpen(true);
  }

  function closeSearchMobile() {
    setSearchMenuOpen(false);
  }

  function openMenuMobile() {
    setAnimateHBGMenuIcon(true);
    setHamburgerMenuOpen(true);
  }

  function closeMenuMobile() {
    console.log("hiya");
    setHamburgerMenuOpen(false);
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
      <div className="hamburger-menu-icon">
        <div
          className={`bars-container 
          ${hamburgerMenuOpen ? "menu-opened" : "menu-closed"} 
          ${animateHBGMenuIcon && "animate"}`}
          onClick={hamburgerMenuOpen ? closeMenuMobile : openMenuMobile}
        >
          <div className="bars-container__bar"></div>
          <div className="bars-container__bar"></div>
          <div className="bars-container__bar"></div>
        </div>
      </div>
      <div
        className="search-menu"
        style={{ display: searchMenuOpen ? "block" : "none" }}
      >
        <p>Search component</p>
        <p onClick={closeSearchMobile}>close</p>
      </div>
      <div
        className="mobile-hamburger-menu"
        style={{ display: hamburgerMenuOpen ? "flex" : "none" }}
      >
        <StyledLink className="mobile-hamburger-menu__link" to="/search">
          Search Sets
        </StyledLink>
        <StyledLink className="mobile-hamburger-menu__link" to="/login">
          Log in
        </StyledLink>
        <StyledLink className="mobile-hamburger-menu__link" to="/register">
          Register
        </StyledLink>
        {/* <FontAwesomeIcon
          icon={faClose}
          className="mobile-hamburger-menu__close"
          onClick={closeMenuMobile}
        /> */}
      </div>
    </Container>
  );
}
