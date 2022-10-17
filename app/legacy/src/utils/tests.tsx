import {
  AppContext,
  AppContextType,
  defaultAppContext,
} from "~/legacy/src/contexts/AppContext";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { FC, PropsWithChildren, ReactElement } from "react";
import {
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks";
import { RenderOptions, RenderResult, act } from "@testing-library/react";
import { StringMap, TOptions } from "i18next";
import { MemoryRouter } from "react-router-dom";
import { Theme } from "~/legacy/src/config/Theme";
import { i18n } from "~/legacy/src/config/Translation";
import { render as rtlRender } from "@testing-library/react";
import { renderHook as rtlRenderHook } from "@testing-library/react-hooks";

export const render = (
  ui: ReactElement | JSX.Element,
  config?: {
    contexts?: { appContext?: AppContextType };
    options?: RenderOptions;
  }
): RenderResult => {
  const AllTheProviders: FC<PropsWithChildren> = ({ children }) => (
    <ThemeProvider theme={Theme as DefaultTheme}>
      <AppContext.Provider
        value={{
          ...defaultAppContext,
          ...config?.contexts?.appContext,
        }}
      >
        <MemoryRouter>{children}</MemoryRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );

  return rtlRender(ui, { wrapper: AllTheProviders, ...config?.options });
};

export const renderHook = (
  hook: (payload: any) => void,
  config?: {
    contexts?: { appContext?: Partial<AppContextType> };
    options?: RenderHookOptions<any>;
  }
): RenderHookResult<any | null, any | null> => {
  const AllTheProviders: FC<PropsWithChildren> = ({ children }) => (
    <ThemeProvider theme={Theme as DefaultTheme}>
      <AppContext.Provider
        value={{
          ...defaultAppContext,
          ...config?.contexts?.appContext,
        }}
      >
        <MemoryRouter>{children}</MemoryRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );

  return rtlRenderHook(hook, { wrapper: AllTheProviders, ...config?.options });
};

export const t = (
  token: string,
  options?: string | TOptions<StringMap> | undefined
): string => i18n.t(token, options);

export const advanceTimersByNTimes = (n = 1, time = 1000) => {
  for (let i = 0; i < n; i++) {
    act(() => {
      jest.advanceTimersByTime(time * 1);
    });
  }
};
