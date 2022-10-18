import { json, LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
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

export async function loader() {
  return json({
    ENV: process.env,
  });
}

export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap",
    },
  ];
};

export default function App() {
  const envs = useLoaderData();
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(envs.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
