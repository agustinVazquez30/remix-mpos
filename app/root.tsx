import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { Theme } from "./legacy/src/config/Theme";
import {
  AppContext,
  defaultAppContext,
} from "./legacy/src/contexts/AppContext";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <AppContext.Provider value={defaultAppContext}>
          <ThemeProvider theme={Theme as DefaultTheme}>
            <Outlet />
          </ThemeProvider>
        </AppContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
