import styled from "styled-components";

import { Wrapper } from "../../reusable/Wrapper.elements";

export const Error = styled.div`

@keyframes fade-in-bkg {
    0% {
        opacity: 0;

    }
    100% {
        opacity: 1;
    }
}
  
  position: absolute;
  z-index: 10000;
  background: rgba(0,0,0,.5);

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  animation: fade-in-bkg 0.4s ease;
`;

export const ErrorWrapper = styled(Wrapper)`

  background: white;
  text-align: center;

  position: absolute;
  top: 30%;
  bottom: 30%;
  left: 10%;
  right: 10%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border: 5px solid ${props => props.theme.colors.orange};
  border-radius: 1rem;
  font-size: 1rem;

  h2 {
    margin-bottom: 2rem;
  }

  .link {
    font-size: 1.5rem;
  }
`;
