// CODED BY: LUCCAS EASTMAN
"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useThemeStore, Theme } from "@/lib/store/theme-store"; // Import Theme type and store
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Tooltip components

/**
 * ThemeSwitcher Component
 * Allows users to switch between different themes.
 * Utilizes DropdownMenu and Tooltip for enhanced user experience.
 */
export function ThemeSwitcher() {
  const { setTheme, getTheme } = useThemeStore(); // Use Zustand store
  const currentTheme = getTheme(); // Get current theme from store

  /**
   * Handles the theme change event.
   * @param {Theme} theme - The selected theme.
   */
  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <TooltipProvider delayDuration={100}> {/* Tooltip Provider for better UX */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild> {/* Tooltip for the trigger button */}
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle Theme"
              className="relative"
            >
              <SunIcon className="h-5 w-5 transition-transform duration-300 transform rotate-0 dark:rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 transition-transform duration-300 transform rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <TooltipContent side="right"> {/* Tooltip for the dropdown menu */}
            Choose a theme
          </TooltipContent>
          {["light", "dark", "ultra-dark", "sage", "nola-saints", "mardi-gras", "christmas", "wtf", "system"].map(
            (theme) => (
              <DropdownMenuItem
                key={theme}
                onClick={() => handleThemeChange(theme as Theme)}
                className="cursor-pointer"
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1).replace("-", " ")}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
