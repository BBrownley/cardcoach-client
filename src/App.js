import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import "./App.css";

import { AuthProvider, ErrorProvider } from "./context";

import AppContainer from "./AppContainer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ErrorProvider>
          <AppContainer />
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
