import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;

  /* set up styles for loading-spinner, differentiate from remaining child elements for optimistic rendering ux */
  .loading-spinner-container {
    border: 1px solid;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 100;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &[class*="loading"] > *:not(.loading-spinner-container) {
    opacity: 0.25;
    pointer-events: none;
  }

  .main {
    margin-left: 18rem;
    padding: 2rem;

    .set-info {
      display: flex;

      span:first-child {
        flex: 2;
        font-size: 1.5rem;
        font-weight: bold;
      }

      span:nth-child(2) {
        flex: 1;
        font-size: 1.5rem;
        text-align: right;
      }

      h3 {
        font-size: 1.5rem;
      }
    }

    .card {
      margin-top: 2rem;
      height: 40rem;
      position: relative;

      &:hover {
        cursor: pointer;
      }

      &.flipped > .card-inner {
        cursor: pointer;
        transform: rotateY(180deg);
        transition: 500ms ease; /* Apply this animation only while flipping */
      }

      &.flipped-reverse > .card-inner {
        cursor: pointer;
        transform: rotateY(0);
        transition: 500ms ease; /* Apply this animation only while flipping */
      }

      .card-inner {
        z-index: -100;
        height: 100%;
        width: 100%;
        position: relative;
        transform-style: preserve-3d;

        .card-front,
        .card-back {
          height: 100%;
          width: 100%;
          box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.5);
          border: 5px solid ${props => props.theme.colors.primary};
          border-radius: 1rem;
          position: absolute;
          backface-visibility: hidden;
        }

        .card-front span,
        .card-back span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .card-front span {
          font-size: 3rem;
          font-weight: bold;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .card-back span {
          font-size: 1.25rem;
        }
      }
    }

    .controls-count {
      padding-top: 1rem;
      display: flex;
      justify-content: space-between;
      font-size: 3rem;
      position: absolute;
      left: 20rem;
      right: 2rem;

      .count {
        font-size: 2rem;
        user-select: none;
      }

      .control {
        cursor: pointer;
      }
    }
  }
`;
