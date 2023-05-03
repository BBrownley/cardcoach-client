import styled from "styled-components";

import { ITButton } from "../../reusable/IconTextButton.elements";

export const Container = styled.div`
  position: relative;
  .sidebar {
    position: fixed;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    font-weight: bold;
    width: 22rem;
    height: 100vh;
    font-size: 1.5rem;
    &__group {
      text-align: center;
      padding: 1rem 0;
      &[class*="active"] {
        background-color: #92f2ff;
        color: black;
      }
    }
  }
  .main {
    /* border: 1px solid black; */
    position: absolute;
    left: 18rem;
    right: 0;
    .inputs {
      display: flex;
      margin-top: 2rem;
      > * {
        flex: 1;
        /* border: 1px solid black; */
      }

      .inputs-left {
        padding-right: 2rem;
      }

      .inputs-right {
        padding-left: 2rem;
        position: relative;
        textarea {
          height: 26.8125rem;
        }
      }

      .field {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;

        label {
          font-weight: bold;
          color: #777;
          margin-bottom: 1rem;
        }

        input,
        textarea {
          width: 100%;
          font-size: 1.25rem;
        }

        textarea {
          min-height: 20rem;
        }
      }
    }
  }
`;

export const ImportTermsButton = styled(ITButton)`
  position: absolute;
  top: 0rem;
  right: 0rem;
  padding: 0 0.5rem 0 0.25rem;

  .button-icon {
    font-size: 1.25rem;
  }

  .button-label {
    font-size: 1.25rem;
  }
`;
