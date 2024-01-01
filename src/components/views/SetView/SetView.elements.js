import styled from "styled-components";

export const Wrapper = styled.div`
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
      }

      .card-inner {
        height: 100%;
        width: 100%;
        position: relative;
        transition: transform 1.25s ease;
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
      }

      .control {
        cursor: pointer;
      }
    }
  }
`;
