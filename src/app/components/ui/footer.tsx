// CODED BY: LUCCAS EASTMAN
"use client";

import { CalendarIcon } from "lucide-react";
import { siteConfig } from "@/config/site"; // Import siteConfig

/**
 * Footer Component
 * Displays the footer with site information and useful links.
 * Ensures responsiveness and accessibility.
 */
export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800 py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Site Information */}
        <span className="text-sm text-gray-500 dark:text-gray-400 order-2 md:order-1 text-center md:text-left">
          {siteConfig.name} © {new Date().getFullYear()}
        </span>
        {/* Footer Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-4 md:space-y-0 text-sm text-gray-500 dark:text-gray-400 order-1 md:order-2">
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center"
            aria-label="GitHub Repository" // Accessibility: ARIA label
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
