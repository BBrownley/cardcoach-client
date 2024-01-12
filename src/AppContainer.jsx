import { useState, useEffect } from "react";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

import { useAuth } from "./context";

import Navigation from "./components/reusable/Navigation/Navigation";
import LandingPage from "./components/views/LandingPage/LandingPage";
import Dashboard from "./components/views/Dashboard/Dashboard";
import CreateSet from "./components/views/CreateSet/CreateSet";
import SetView from "./components/views/SetView/SetView";

import Register from "./components/views/Register/Register";
import Login from "./components/views/Login/Login";

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
    &:hover {
      opacity: 0.8;
      transition: 0.5s;
      cursor: pointer;
    }
  }

  .clr-primary {
    color: ${props => props.theme.colors.primary};
  }

  .unauthorized {
    text-align: center;
    padding-top: 4rem;
  }
`;

export default function AppContainer() {
  const auth = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Container>
          <Navigation />
          {auth.user !== null && <Dashboard />}
          {auth.user === null && auth.loading === false && <LandingPage />}
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
          {auth.user !== null && <Dashboard />}
          {auth.user === null && auth.loading === false && (
            <p className="unauthorized" data-testid="unauthorized">
              Unauthorized access - please <Link to="/login">log in</Link>.
            </p>
          )}
        </Container>
      )
    },
    {
      path: "/create",
      element: (
        <Container>
          {auth.user !== null && <CreateSet />}
          {auth.user === null && auth.loading === false && (
            <p className="unauthorized" data-testid="unauthorized">
              Unauthorized access - please <Link to="/login">log in</Link>.
            </p>
          )}
        </Container>
      )
    },
    {
      path: "/sets/:setid",
      element: (
        <Container>
          {auth.user !== null && <SetView />}
          {auth.user === null && auth.loading === false && (
            <p className="unauthorized" data-testid="unauthorized">
              Unauthorized access - please <Link to="/login">log in</Link>.
            </p>
          )}
        </Container>
      )
    },
    // {
    //   path: "/notfound",
    //   element: <Container><NotFound /></Container>
    // },
    // {
    //   path: "/error",
    //   element: <Container><ErrorPage /></Container>
    // },
    {
      path: "*",
      element: <Container><NotFound /></Container>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
