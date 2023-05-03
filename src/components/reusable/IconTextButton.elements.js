import styled from "styled-components";

export const ITButton = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 10rem;
  display: inline-block;

  .button-icon {
    font-size: 1.5rem;
  }

  .button-label {
    display: inline-block;
    margin: 0 0 0 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
  }
`;
