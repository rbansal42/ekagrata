"use client";

import type { ThemeProviderProps } from "next-themes";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({
  children,
  themeProps,
}: {
  children: React.ReactNode;
  themeProps: ThemeProviderProps;
}) {
  return <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>;
}
