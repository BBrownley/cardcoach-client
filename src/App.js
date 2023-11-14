import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import "./App.css";

import { AuthProvider } from "./context";

import AppContainer from "./AppContainer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
