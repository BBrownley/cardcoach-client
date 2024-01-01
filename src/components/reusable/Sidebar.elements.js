/* 
Sidebar component will be used for the create/edit set views
*/

import styled from "styled-components";

export const Sidebar = styled.div`
  position: fixed;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-weight: bold;
  width: 18rem;
  height: 100vh;
  font-size: 1rem;
  .sidebar__group {
    &--spaced {
      display: flex;
      flex-direction: column;
      align-content: space-between;
    }

    width: 100%;
    text-align: center;
    margin-bottom: 1rem;

    &[class*="active"] {
      background-color: #92f2ff;
      color: black;
    }

    &--space-around {
      display: flex;
      justify-content: space-around;
    }

    &__el {
      /* gives sidebar group elements extra spacing above and below */
      &--m2 {
        margin: 2rem 0;
      }
    }
  }
  button {
    background-color: ${props => props.theme.colors.primaryLightened};
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;

    &:hover {
      transition: 0.25s;
      cursor: pointer;
      background-color: ${props => props.theme.colors.primarydarkened};
    }
  }

  @media (max-width: 800px) {
    display: none;
  }

  /* spreads out sidebar groups vertically */
  &.spaced {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

`;

export const SidebarMobile = styled(Sidebar)`
  display: none;
  right: 0;
  height: 10rem;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  padding: 1rem;

  .sidebar__group {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
    .create {
      margin-bottom: 1.625rem;
    }
    .skip-mastered-terms {
      margin-bottom: 1.625rem;
    }
  }

  @media (max-width: 800px) {
    display: flex;
    align-items: center;
  }
`;
