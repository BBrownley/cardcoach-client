import React, { useState, useEffect } from "react";

import StyledLink from "../../reusable/elements.elements";

import { Container } from "./Login.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import userService from "../../../services/users";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const valid = validateForm();

    if (valid) {
      // pass user/pw to server
      const user = { username, password };

      const res = await userService.login(user);

      if (res?.error) {
        setErrors(res.error);
      } else {
        // login successful; re-direct to dashboard
        navigate("/dashboard");
      }
    }
  };

  // Client-side validation ensures the username and password fields are filled in
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };

  return (
    <Container>
      <h3>Log in</h3>
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
                <FontAwesomeIcon icon={faCircleExclamation} className="warning-icon" />
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
                <FontAwesomeIcon icon={faCircleExclamation} className="warning-icon" />
              </h5>
            )}
          </div>
          <button type="submit" className="btn btn-primary create-acc">
            Log in
          </button>
        </form>
      </div>
      <h3 className="need-acc">
        Need an account? <StyledLink to="/register">Register</StyledLink> here!
      </h3>
    </Container>
  );
}
