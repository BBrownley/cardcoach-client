import styled from "styled-components";

import { Wrapper } from "../../reusable/Wrapper.elements";

export const Features = styled.div`
  background-color: ${props => props.theme.colors.primary};
  padding-bottom: 10rem;
`;

export const FeaturesWrapper = styled(Wrapper)`
  color: white;

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.hidden {
    visibility: hidden;
  }

  &.animate {
    @keyframes animate-features-section {
      from {
        opacity: 0;
        transform: translateY(100px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    animation: fade-up 0.5s;
    .feature {
      animation: fade-up 0.75s ease-in;
      animation-fill-mode: forwards;
      &:nth-child(1) {
        animation-delay: 0.2s;
      }
      &:nth-child(2) {
        animation-delay: 0.4s;
      }
      &:nth-child(3) {
        animation-delay: 0.6s;
      }
      &:nth-child(4) {
        animation-delay: 0.8s;
      }
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 10rem;
  }

  .features-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .feature {
      opacity: 0;
      position: relative;
      flex-basis: 48%;

      h3 {
        /* color: ${props => props.theme.colors.primary}; */
        line-height: 3.5rem;

        .feature-icon {
          position: absolute;
          color: white;
          margin-right: 1.5rem;
          font-size: 3rem;
        }

        span {
          margin-left: 5rem;
        }
      }

      .feature-description {
        margin-top: 3rem;

        line-height: 3rem;
        font-size: 1.5rem;
      }

      &:nth-child(3),
      :nth-child(4) {
        margin-top: 5rem;
      }
    }

    /* move to single column layout */
    @media (max-width: 800px) {
      text-align: center;
      margin-top: -4rem;

      .feature {
        flex-basis: 100%;
        margin-top: 4rem;
      }

      .feature-description {
        margin-top: 1rem;

        line-height: 3rem;
        font-size: 1.5rem;
      }
    }
  }
`;
