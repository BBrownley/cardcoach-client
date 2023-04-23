import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  padding: 0 1rem;

  &[class*="m-top"] {
    margin-top: 10rem;
  }

  &[class*="m-bottom"] {
    margin-bottom: 10rem;
  }
`;
