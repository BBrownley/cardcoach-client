import React from "react";

import { NotFound as Container, NotFoundWrapper } from "./NotFound.elements";

import StyledLink from "../../reusable/elements.elements";

export default function NotFound() {
  return (
    <Container>
      <NotFoundWrapper>
        <h2>404 - Not Found</h2>
        <p>
          Oops! Looks like the flashcards you were looking for got lost in a
          pile of virtual clutter. Try searching for it again or revisit the{" "}
          <StyledLink to="/">homepage</StyledLink>
        </p>
      </NotFoundWrapper>
    </Container>
  );
}
