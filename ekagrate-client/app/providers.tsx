"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function Providers({ children, themeProps }: { children: React.ReactNode; themeProps: ThemeProviderProps }) {
  return (
    <NextThemesProvider {...themeProps}>
      {children}
    </NextThemesProvider>
  );
} 