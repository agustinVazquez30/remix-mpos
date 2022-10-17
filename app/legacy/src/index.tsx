import "~/legacy/src/config/Translation";
import "~/legacy/src/config/Amplitude";

import { DefaultTheme, ThemeProvider } from "styled-components";
import { RebootStyle, Theme } from "~/legacy/src/config/Theme";

import { App } from "./App";
import { GlobalStyles } from "./globalStyles";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { initializeFirebaseApp } from "~/legacy/src/config/Firebase/firebase";
import reportWebVitals from "./reportWebVitals";

initializeFirebaseApp();

const container = document.getElementById("root") as HTMLElement;

const app = createRoot(container);

app.render(
  <ThemeProvider theme={Theme as DefaultTheme}>
    {/* <React.StrictMode> */}
    <Router>
      <App />
      <GlobalStyles />
    </Router>
    <RebootStyle />
    {/* </React.StrictMode> */}
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
