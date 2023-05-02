import styled from "styled-components";

export const Container = styled.div`
  border: 3px solid ${props => props.theme.colors.purple};
  border-radius: 1rem;
  padding: 0.625rem;
  position: relative;
  height: 12.5rem;
  width: 21.875rem;
  display: inline-block;
  margin: 0 4.5rem 4.5rem 0;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  .title-desc {
    position: absolute;
    top: 0.625rem;
    left: 0.625rem;
    /* border: 1px solid black; */

    .title {
      /* border: 1px solid black; */
      width: 70%;
      font-weight: bold;
      margin-bottom: 0.625rem;

      /* font-size: 0.875rem; */
    }

    .desc {
      color: #777;
      font-size: 0.875rem;
    }
  }

  .term-count {
    font-weight: bold;
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
    color: #777;
  }

  .progress {
    position: absolute;
    bottom: 0.625rem;
    right: 0.625rem;
    left: 0.625rem;
    display: flex;
    align-content: center;
    &__bar {
      flex: 1;
      margin-left: 0.5rem;
    }
    &__star {
      color: #d9d9d9;
      font-size: 1.25rem;
      &[class*="full-mastery"] {
        color: ${props => props.theme.colors.gold};
      }
    }
  }

  &:hover {
    transition: 0.15s;
    cursor: pointer;
    transform: translateY(-0.25rem);
  }
`;
