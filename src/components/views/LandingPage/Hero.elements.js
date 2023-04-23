import styled from "styled-components";

export const Hero = styled.div`
  color: black;
  font-size: 2.5rem;
  /* border: 1px solid #ccc; */

  display: flex;

  /* make both children equal width */
  > * {
    flex: 1;
    width: 0; /* Set width to 0 to evenly distribute available space */
    &:nth-child(1) {
      padding-right: 0.5rem;
    }
    &:nth-child(2) {
      padding-left: 0.5rem;
      /* border: 2px solid #ccc; */
    }
  }

  @keyframes hero-body-text-anim {
    from {
      transform: translateY(3rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes hero-body-btn-anim {
    0% {
      transform: translateX(10rem);
      opacity: 0;
    }
    70% {
      transform: translateX(10rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .hero-body {
    animation: hero-body-text-anim 0.5s ease-out;

    span {
      font-weight: bold;
    }

    .btn {
      animation: hero-body-btn-anim 2s ease-out;
      font-size: 2.5rem;
      height: 4rem;
      margin-top: 4rem;
      padding-left: 2rem;
      padding-right: 2rem;
      display: block;
      &__arrow {
        margin-left: 1rem;
      }
    }
  }

  .hero-image {
    position: relative;

    /* target all 3 flashcards */
    > * {
      background-color: #fff;
      width: 350px;
      height: 200px;
      border-radius: 1rem;
      position: absolute;
      border: 1px solid black;

      top: 50%;
      left: 50%;
      animation-fill-mode: forwards;

      visibility: hidden;
      animation-play-state: paused;

      &[class*="animate"] {
        visibility: visible;
        animation-play-state: running;
      }

      .card-icon {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-size: 1.75rem;
        color: #333;
      }
    }

    /* cards fade in on load */

    @keyframes card-1-anim {
      0% {
        opacity: 0;
        transform: translate(35%, -65%);
      }
      100% {
        opacity: 1;
        transform: translate(-65%, -65%);
      }
    }

    @keyframes card-2-anim {
      0% {
        opacity: 0;
        transform: translate(50%, -50%);
      }
      25% {
        opacity: 0;
        transform: translate(50%, -50%);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }

    @keyframes card-3-anim {
      0% {
        opacity: 0;
        transform: translate(65%, -35%);
      }
      50% {
        opacity: 0;
        transform: translate(65%, -35%);
      }
      100% {
        opacity: 1;
        transform: translate(-35%, -35%);
      }
    }

    .card-1 {
      border: 0.25rem solid #2196f3;
      transform: translate(-65%, -65%);
      animation: card-1-anim 1s cubic-bezier(0.4, 0, 0.6, 1);
    }

    .card-2 {
      border: 0.25rem solid #21f38e;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: card-2-anim 1s cubic-bezier(0.4, 0, 0.6, 1);
    }

    .card-3 {
      border: 0.25rem solid #8a21f3;
      top: 50%;
      left: 50%;
      transform: translate(-35%, -35%);
      animation: card-3-anim 1s cubic-bezier(0.4, 0, 0.6, 1);
    }
  }
`;
