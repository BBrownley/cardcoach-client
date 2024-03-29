import styled from "styled-components";

import { Wrapper as W } from "../../reusable/Wrapper.elements";
import { ITButton } from "../../reusable/IconTextButton.elements";

export const Container = styled.div`
  margin-bottom: 10rem;
`;

export const Wrapper = styled(W)`
  position: relative;
  padding-top: 6.25rem;

  .create-set-button {
    position: fixed;
    right: 2rem;
    bottom: 2rem;

    background-color: ${props => props.theme.colors.primary};
    color: white;
    padding: 1rem;
    border-radius: 10rem;

    .plus-circle {
      font-size: 1.5rem;
    }

    h4 {
      display: inline-block;
      margin: 0 0 0 1rem;
    }

    &:hover {
      cursor: pointer;
    }
  }

  h4 {
    margin: 4rem 0;
  }
`;

export const CreateSetButton = styled(ITButton)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;

  h4 {
    margin: 0;
  }
`;
