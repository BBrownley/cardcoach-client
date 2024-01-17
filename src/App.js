import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import "./App.css";

import { AuthProvider, ErrorProvider, SetEditProvider } from "./context";

import AppContainer from "./AppContainer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ErrorProvider>
          <SetEditProvider>
            <AppContainer />
          </SetEditProvider>
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
