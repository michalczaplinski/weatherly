import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Loading from "./components/Loading";

import Search from "./pages/Search";
import Location from "./pages/Location";

const theme = {
  mainColor: "rgb(0, 76, 209)",
  secondaryColor: "#ffe1db",
  textColor: "rgba(0, 0, 0, 0.65)"
};

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.textColor};
  }
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Router>
        <Route component={Loading} />
        <Route path="/" exact component={Search} />
        <Route path="/:coords" component={Location} />
      </Router>
    </>
  </ThemeProvider>
);

export default App;
