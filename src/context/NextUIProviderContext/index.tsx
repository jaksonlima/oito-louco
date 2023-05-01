import {
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { NextUIProvider } from "@nextui-org/react";

import { Theme, buildTheme } from "@/src/configuration/themeConfig";
import { instance } from "@/src/utils/localStorage";
import { THEME } from "@/src/utils/env";

export const defaultThemeConfig = "dark";

function setThemeLocalStorage(theme: Theme) {
  instance()?.setItem(THEME, theme);
}

function getThemeLocalStorage() {
  return (instance()?.getItem(THEME) || defaultThemeConfig) as Theme;
}

const NextUIProviderContext = createContext<{
  theme: Theme;
  changeTheme: () => void;
}>({ theme: defaultThemeConfig, changeTheme: () => {} });

function NextUIProviderCustom({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(defaultThemeConfig);

  function changeTheme() {
    const aTheme = getThemeLocalStorage();

    const nexTheme =
      aTheme === defaultThemeConfig ? "light" : defaultThemeConfig;

    setTheme(nexTheme);
    setThemeLocalStorage(nexTheme);
  }

  useEffect(() => {
    const theme = getThemeLocalStorage() as Theme;

    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  return (
    <NextUIProviderContext.Provider
      value={{ theme: defaultThemeConfig, changeTheme }}
    >
      <NextUIProvider theme={buildTheme(theme)}>{children}</NextUIProvider>
    </NextUIProviderContext.Provider>
  );
}

const useContextNextUI = () => useContext(NextUIProviderContext);

export { NextUIProviderContext, useContextNextUI, NextUIProviderCustom };
