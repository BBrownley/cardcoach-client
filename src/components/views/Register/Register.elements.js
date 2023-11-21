import styled from "styled-components";

import { Wrapper } from "../../reusable/Wrapper.elements";

export const Container = styled(Wrapper)`
  font-size: 2.5rem;
  text-align: center;
  padding-top: 13.5rem;

  > * {
    margin-bottom: 7rem;
  }
  form {
    font-size: 1.5rem;
    font-weight: bold;

    margin: 0 auto;
    display: inline-block;

    .form-field {
      display: flex;
      justify-content: right;
      margin-bottom: 3rem;
      position: relative;
      text-align: right;

      label {
        margin-right: 3rem;
      }

      .field-error {
        @keyframes field-error-anim {
          from {
            opacity: 0;
            right: -2rem;
          }

          to {
            opacity: 1;
            right: 0;
          }
        }

        animation: field-error-anim 0.5s;
        position: absolute;
        right: 0;
        top: -2rem;
        color: ${props => props.theme.colors.orange};
      }
    }
  }

  .create-acc {
    margin: 7rem 0;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .already-have-acc {
    font-weight: 400;
  }
  /* change flex direction of form fields to take up less width*/
  @media (max-width: 820px) {
    form {
      .form-field {
        flex-direction: column;
        align-items: flex-start;
        font-size: 1rem;

        .field-error {
          top: -0.25rem;
          font-size: 1rem;
        }
      }
    }
  }
`;
