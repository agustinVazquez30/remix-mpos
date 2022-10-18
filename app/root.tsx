import {
  json,
  LoaderFunction,
  MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useMemo, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { Theme } from "./legacy/src/config/Theme";
import {
  AppContext,
  AppContextKeys,
  defaultAppContext,
  defaultAppState,
  getAppActions,
  useAppContext,
} from "./legacy/src/contexts/AppContext";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";

type LoaderData = { locale: string; ENV: NodeJS.ProcessEnv };

export let loader: LoaderFunction = async ({ request }) => {
  let locale = await i18next.getLocale(request);
  return json<LoaderData>({ locale, ENV: process.env });
};

export let handle = {
  i18n: "common",
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

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
  let { locale } = useLoaderData<LoaderData>();

  let { i18n } = useTranslation();

  useChangeLanguage(locale);
  const envs = useLoaderData();
  const [state, setState] = useState<any>(defaultAppState);

  const data = {
    // ...defaultAppState.splitIOKeyValue,
    // ...JSON.parse(getItemFromStorage(AppContextKeys.APP)),
    ...getAppActions(setState as any),
  };

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
        <AppContext.Provider value={{ ...data, ...state }}>
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
