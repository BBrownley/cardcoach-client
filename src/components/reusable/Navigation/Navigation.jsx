import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context";

import { Container } from "./Navigation.elements";
import { Wrapper } from "../Wrapper.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import StyledLink from "../elements.elements";

export default function Navigation() {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  // prevent hamburger menu icon from animating upon its render
  const [animateHBGMenuIcon, setAnimateHBGMenuIcon] = useState(false);
  const user = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);

      if (deviceWidth > 550) {
        setAnimateHBGMenuIcon(false);
        setHamburgerMenuOpen(false);
      }

      if (deviceWidth > 940) {
        setSearchMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // cleanup fcn
  }, [deviceWidth]);

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
    setHamburgerMenuOpen(false);
  }

  return (
    <Wrapper>
      <Container>
        <StyledLink className="branding no-line" to="/">
          <div>
            <span className="clr-primary">C</span>
            <span className="branding-blk-text">ard</span>
            <span className="clr-primary">C</span>
            <span className="branding-blk-text">oach</span>
          </div>
        </StyledLink>
        <div className="nav-search">
          <div className="search-container">
            <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
              onClick={openSearchMobile}
              aria-label="open search menu"
            />
            <input
              type="text"
              placeholder="What would you like to study today?"
              id="search"
            ></input>
          </div>
        </div>
        {!user && (
          <div className="login-register">
            <Link to="/login" className="link-btn">
              <button className="btn btn-secondary">Login</button>
            </Link>
            <Link to="/register" className="link-btn">
              <button className="btn btn-primary">Register</button>
            </Link>
          </div>
        )}
        {!!user && <p>You are logged in!</p>}
        <div className="hamburger-menu-icon" aria-label="menu">
          <div
            className={`
              bars-container 
              ${hamburgerMenuOpen ? "menu-opened" : "menu-closed"} 
              ${animateHBGMenuIcon && "animate"}
            `}
            onClick={hamburgerMenuOpen ? closeMenuMobile : openMenuMobile}
          >
            <div className="bars-container__bar"></div>
            <div className="bars-container__bar"></div>
            <div className="bars-container__bar"></div>
          </div>
        </div>
        <div className="search-dropdown" style={{ display: searchMenuOpen ? "block" : "none" }}>
          <p>Search component</p>
          <p onClick={closeSearchMobile} aria-label="close search menu">
            close
          </p>
        </div>
        <div
          className="mobile-hamburger-menu"
          style={{ display: hamburgerMenuOpen ? "flex" : "none" }}
        >
          <StyledLink className="mobile-hamburger-menu__link no-line" to="/login" key="/login">
            Log in
          </StyledLink>
          <StyledLink
            className="mobile-hamburger-menu__link no-line"
            to="/register"
            key="/register"
          >
            Register
          </StyledLink>
        </div>
      </Container>
    </Wrapper>
  );
}
