import styled from "styled-components";

export const Container = styled.div`
  border: 4px solid #ccc;
  margin-bottom: 2rem;
  border-radius: 1rem;
  box-shadow: 3px 4px 4px 0 rgba(0, 0, 0, 0.2);

  textarea {
    min-height: 4rem;
  }

  .card-top {
    font-size: 1.5rem;
    border-bottom: 2px solid #ccc;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    &__order {
      font-weight: bold;
    }

    &__right {
      display: flex;

      .delete {
        margin-left: 1rem;
        .delete-icon {
          color: #ccc;
          &:hover {
            cursor: pointer;
            color: ${props => props.theme.colors.orange};
          }
        }
      }
    }
  }

  .card-main {
    display: flex;
    padding: 1rem;

    > * {
      flex: 1;
    }

    input,
    textarea {
      margin-top: 1rem;
      width: 100%;
    }

    &__term {
      margin-right: 1rem;
    }

    &__definition {
      margin-left: 1rem;
      textarea {
        height: 10rem;
      }
    }

    @media (max-width: 1000px) {
      flex-direction: column;
      &__term {
        margin-right: 0;
      }
      &__definition {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }
`;
