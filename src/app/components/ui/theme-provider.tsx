// CODED BY: LUCCAS EASTMAN
"use client";

import React, { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Theme } from "@/lib/store/theme-store"; // Import Theme type

interface ThemeProviderProps {
  children: ReactNode;
  themes?: Theme[]; // Explicitly type themes prop as array of Theme
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * ThemeProvider Component
 * Wraps the application with NextThemesProvider to manage theme switching.
 * Validates provided themes against allowed themes for type safety.
 */
export function ThemeProvider({
  children,
  themes = ["system", "dark", "ultra-dark", "sage", "nola-saints", "mardi-gras", "christmas", "wtf"],
  defaultTheme = "system",
  storageKey = "aahplexx-theme",
  ...props
}: ThemeProviderProps) {
  // Define allowed themes for validation
  const allowedThemes: Theme[] = ["system", "dark", "ultra-dark", "sage", "nola-saints", "mardi-gras", "christmas", "wtf"];

  /**
   * Validates the themes prop to ensure only allowed themes are used.
   * Logs an error and falls back to allowedThemes if validation fails.
   */
  const validatedThemes = themes.filter((theme) =>
    allowedThemes.includes(theme)
  );

  if (validatedThemes.length !== themes.length) {
    console.error(
      "ThemeProvider: Some themes provided are invalid. Allowed themes are:",
      allowedThemes
    );
  }

  return (
    <NextThemesProvider
      themes={validatedThemes.length > 0 ? validatedThemes : allowedThemes}
      defaultTheme={defaultTheme}
      attribute="class"
      enableSystem
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
