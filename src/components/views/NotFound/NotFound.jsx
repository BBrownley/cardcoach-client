import React from "react";
import {useError} from "../../../context"

import { NotFound as Container, NotFoundWrapper } from "./NotFound.elements";

import StyledLink from "../../reusable/elements.elements";

export default function NotFound() {

  const errMsg = useError();

  return (
    <Container>
      <NotFoundWrapper>
        <h2>404 - Not Found</h2>
        <p data-testid="not-found">
          Oops! Looks like the flashcards you were looking for got lost in a
          pile of virtual clutter. Try searching for it again or revisit the{" "}
          <StyledLink to="/">homepage</StyledLink>
        </p>
      </NotFoundWrapper>
    </Container>
  );
}
