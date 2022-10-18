import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
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
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";

type LoaderData = { locale: string };

export let loader: LoaderFunction = async ({ request }) => {
  let locale = await i18next.getLocale(request);
  return json<LoaderData>({ locale });
};

export let handle = {
  i18n: "common",
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  let { locale } = useLoaderData<LoaderData>();

  let { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
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
