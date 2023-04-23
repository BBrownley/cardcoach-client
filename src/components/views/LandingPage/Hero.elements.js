import styled from "styled-components";

export const Hero = styled.div`
  color: black;
  font-size: 2.5rem;
  border: 1px solid black;

  display: flex;

  /* make both children equal width */
  > * {
    flex: 1;
    width: 0; /* Set width to 0 to evenly distribute available space */
  }

  .hero-body {
    span {
      font-weight: bold;
    }

    .btn {
      font-size: 2.5rem;
      height: 4rem;
      &__arrow {
        margin-left: 1rem;
      }
    }
  }
`;
