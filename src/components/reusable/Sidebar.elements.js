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
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;

    /* display: flex;
    justify-content: space-between; */

    /* padding: 1rem;
    background-color: black;

    display: flex;
    justify-content: space-between; */
    &[class*="active"] {
      background-color: #92f2ff;
      color: black;
    }

    &--space-around {
      display: flex;
      justify-content: space-around;
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
`;
