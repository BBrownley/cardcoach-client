import styled, { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import "./App.css";
import LandingPage from "./components/views/LandingPage/LandingPage";
import Navigation from "./components/reusable/Navigation/Navigation";

const Container = styled.div`
  a {
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    font-size: 1.5rem;
    &:visited {
      color: ${props => props.theme.colors.primary};
    }
  }

  .btn {
    min-width: 7.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    font-size: 1.5rem;
    border: none;
    &-primary {
      background-color: ${props => props.theme.colors.primary};
    }
    &-secondary {
      background-color: "#F0E9E9";
      color: black;
    }
  }
`;

const baseEl = (
  <Container>
    <Navigation />
    <LandingPage />
  </Container>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: baseEl
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
