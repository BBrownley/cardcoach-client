import styled from "styled-components";

import { Wrapper } from "../../reusable/Wrapper.elements";

import studyingImg from "../../../assets/images/studying.png";

export const WhyUs = styled.div``;

export const WhyUsWrapper = styled(Wrapper)`
  font-size: 1.5rem;
  line-height: 3rem;
  padding-top: 10rem;
  padding-bottom: 10rem;

  h2 {
    text-align: center;
    margin-bottom: 7.5rem;
  }

  .main-content {
    display: flex;
    justify-content: space-between;

    > * {
      flex-basis: 48%;
    }

    .studying-image {
      background-image: url(${studyingImg});
      background-size: cover;
      background-position: right;
      
    }
  }

  @media (max-width: 1000px) {
    .main-content {
      text-align: center;
      display: block;
    }
  }
`;
