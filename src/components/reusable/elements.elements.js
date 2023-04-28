import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: underline;
  }

  &[class*="no-line"] {
    text-decoration: none;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
`;

export default props => <StyledLink {...props} />;
