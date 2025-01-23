// CODED BY: LUCCAS EASTMAN
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site"; // Import siteConfig

interface NavLinkProps {
  href: string;
  title: string;
  className?: string;
}

/**
 * NavLink Component
 * Renders a navigation link with active state styling.
 * Utilizes React.forwardRef for better integration with other components.
 */
const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, title, className, ...props }, ref) => {
    const pathname = usePathname();
    const isActive =
      pathname === href || (pathname.startsWith(`${href}/`) && href !== "/");

    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-3 py-2",
          isActive
            ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
            : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {title}
      </Link>
    );
  }
);
NavLink.displayName = "NavLink";

/**
 * Navigation Component
 * Renders the main navigation bar with links defined in siteConfig.
 * Includes responsive design for different screen sizes.
 */
export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Aahplexx</span>
          </Link>
          <div className="flex items-center space-x-2">
            <NavLink href="/course/module-1" title="SQL Basics" />
            <NavLink href="/course/module-2" title="SQL Intermediate" />
            <NavLink href="/course/module-3" title="SQL Advanced" />
            {/* Add other navigation links here */}
          </div>
        </div>
      </div>
    </nav>
  );
}
