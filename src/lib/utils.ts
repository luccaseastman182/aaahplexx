// CODED BY: LUCCAS EASTMAN
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join classNames together.
 * Combines clsx and tailwind-merge for optimal className management.
 * @param {...ClassValue[]} inputs - Class values to be merged.
 * @returns {string} - Merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
