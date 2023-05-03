import styled, { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import "./App.css";

import Navigation from "./components/reusable/Navigation/Navigation";
import LandingPage from "./components/views/LandingPage/LandingPage";
import Dashboard from "./components/views/Dashboard/Dashboard";
import CreateSet from "./components/views/CreateSet/CreateSet";

import Register from "./components/views/Register/Register";

import NotFound from "./components/views/NotFound/NotFound";

const Container = styled.div`
  a {
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    font-size: inherit;
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

  .clr-primary {
    color: ${props => props.theme.colors.primary};
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Container>
        <Navigation />
        <LandingPage />
      </Container>
    )
  },
  {
    path: "/register",
    element: (
      <Container>
        <Navigation />
        <Register />
      </Container>
    )
  },
  {
    path: "/dashboard",
    element: (
      <Container>
        <Navigation />
        <Dashboard />
      </Container>
    )
  },
  {
    path: "/create",
    element: (
      <Container>
        <Navigation />
        <CreateSet />
      </Container>
    )
  },
  {
    path: "*",
    element: <NotFound />
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
