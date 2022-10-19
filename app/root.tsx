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
import { useEffect, useMemo, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { SplitIOTreatmentNames } from "./legacy/src/config/SplitIo";
import { SplitIOTreatmentNamesLoading } from "./legacy/src/config/SplitIo/models";
import { Theme } from "./legacy/src/config/Theme";
import {
  AppContext,
  AppContextKeys,
  defaultAppState,
  getAppActions,
} from "./legacy/src/contexts/AppContext";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import { getItemFromStorage } from "./legacy/src/contexts/AppContext/utils";

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
  const [state, setState] = useState<any>();

  useEffect(() => {
    const appState = {
      ...defaultAppState,
      ...JSON.parse(getItemFromStorage(AppContextKeys.APP)),
      ...getAppActions(setState as any),
    };

    setState({
      ...appState,
      splitIOKeyValue: {
        [SplitIOTreatmentNames.ActivationPOSCXZendesk]: false,
        [SplitIOTreatmentNamesLoading.ActivationPOSCXZendeskLoading]: false,
        [SplitIOTreatmentNames.ActivationPOSValuesLanding]: true,
        [SplitIOTreatmentNamesLoading.ActivationPOSValuesLandingLoading]: true,
      },
      persisted: true,
    });
  }, []);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        {state && (
          <AppContext.Provider value={state}>
            <ThemeProvider theme={Theme as DefaultTheme}>
              <Outlet />
            </ThemeProvider>
          </AppContext.Provider>
        )}
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
