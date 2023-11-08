import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import "./App.css";

import userService from "./services/users";

import Navigation from "./components/reusable/Navigation/Navigation";
import LandingPage from "./components/views/LandingPage/LandingPage";
import Dashboard from "./components/views/Dashboard/Dashboard";
import CreateSet from "./components/views/CreateSet/CreateSet";

import Register from "./components/views/Register/Register";
import Login from "./components/views/Login/Login";

import NotFound from "./components/views/NotFound/NotFound";

import { AuthContext } from "./context.js";

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
    &:hover {
      opacity: 0.8;
      transition: 0.5s;
      cursor: pointer;
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
    path: "/login",
    element: (
      <Container>
        <Navigation />
        <Login />
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const session = await userService.getUserSession();

      if (session.loggedIn) {
        const { id, username } = session;
        setUser({ id, username });
      }
    };

    checkLogin(); // send GET request to /users/login
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={user}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
