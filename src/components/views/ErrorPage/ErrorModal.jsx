import React from "react";
import {useError} from "../../../context"

import { Error as Container, ErrorWrapper } from "./ErrorModal.elements";

import StyledLink from "../../reusable/elements.elements";

import {useNavigate} from "react-router-dom"

export default function ErrorModal() {

  const errObj = useError();
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorWrapper>
        <h2 data-testid="error-status">{errObj.status}</h2>
        <p data-testid="error-msg">
          {errObj.message}
          </p>
          <br/>
          <br/>
          <StyledLink data-testid="go-back" className="link" onClick={() => navigate(-1)}>Go back</StyledLink>
       
      </ErrorWrapper>
    </Container>
  );
}
