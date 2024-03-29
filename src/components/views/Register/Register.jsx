import React, { useState, useEffect } from "react";

import StyledLink from "../../reusable/elements.elements";

import { Container } from "./Register.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import userService from "../../../services/users";
import { useAuthUpdate } from "../../../context";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const updateUserAuth = useAuthUpdate();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const valid = validateForm();

    if (valid) {
      // pass user/email/pw to server
      const newUser = { username, email, password, confirmPassword };

      const res = await userService.register(newUser);

      if (res?.error) {
        setErrors(res.error);
      } else {
        // registration successful; update user, re-direct to dashboard
        updateUserAuth(res);
        navigate("/dashboard");
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    const alphanumeric = /^[a-z0-9]+$/i;

    if (!username) {
      errors.username = "Username is required";
      isValid = false;
    } else if (!alphanumeric.test(username)) {
      errors.username = "Username must contain alphanumeric characters only";
      isValid = false;
    } else if (username.length > 20) {
      errors.username = "Username cannot be more than 20 characters";
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
              data-testid="username-field"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
            {errors.username && (
              <h5 className="field-error" data-testid="username-field-error">
                {errors.username}{" "}
                <FontAwesomeIcon icon={faCircleExclamation} className="warning-icon" />
              </h5>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              data-testid="email-field"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            {errors.email && (
              <h5 className="field-error" data-testid="email-field-error">
                {errors.email}{" "}
                <FontAwesomeIcon icon={faCircleExclamation} className="warning-icon" />
              </h5>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              data-testid="password-field"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            {errors.password && (
              <h5 className="field-error" data-testid="password-field-error">
                {errors.password}{" "}
                <FontAwesomeIcon icon={faCircleExclamation} className="warning-icon" />
              </h5>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              data-testid="confirm-password-field"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
            />
            {errors.confirmPassword && (
              <h5 className="field-error" data-testid="confirm-password-field-error">
                {errors.confirmPassword}{" "}
                <FontAwesomeIcon icon={faCircleExclamation} className="warning-icon" />
              </h5>
            )}
          </div>
          <button type="submit" className="btn btn-primary create-acc" data-testid="register-btn">
            Create Account
          </button>
        </form>
      </div>
      <h3 className="already-have-acc">
        Already have an account? <StyledLink to="/login">Log in</StyledLink> here!
      </h3>
    </Container>
  );
}
