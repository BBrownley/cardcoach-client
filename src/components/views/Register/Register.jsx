import React, { useState, useEffect } from "react";

import StyledLink from "../../reusable/elements.elements";

import { Container } from "./Register.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import userService from "../../../services/users";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = event => {
    event.preventDefault();

    const valid = validateForm();

    if (valid) {
      // TODO: submit form data to server
      console.log("registration valid");
      userService.register();
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };

  return (
    <Container>
      <h3>Register Account</h3>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
            {errors.username && (
              <h5 className="field-error">
                {errors.username}{" "}
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="warning-icon"
                />
              </h5>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            {errors.email && (
              <h5 className="field-error">
                {errors.email}{" "}
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="warning-icon"
                />
              </h5>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            {errors.password && (
              <h5 className="field-error">
                {errors.password}{" "}
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="warning-icon"
                />
              </h5>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
            />
            {errors.confirmPassword && (
              <h5 className="field-error">
                {errors.confirmPassword}{" "}
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="warning-icon"
                />
              </h5>
            )}
          </div>
          <button type="submit" className="btn btn-primary create-acc">
            Create Account
          </button>
        </form>
      </div>
      <h3 className="already-have-acc">
        Already have an account? <StyledLink to="/login">Log in</StyledLink>{" "}
        here!
      </h3>
    </Container>
  );
}
