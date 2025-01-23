import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/ui/footer"
import './globals.css'
import { ErrorBoundary } from "@/components/ui/error-boundary" // Import ErrorBoundary

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' }) // Optimize font loading

export const metadata: Metadata = {
  title: 'Aahplexx - Your Modern Web Platform', // More descriptive title
  description: 'A comprehensive web platform offering a suite of tools and features for conversion, music, galleries, creative prompts, and more. Experience the modern web with Aahplexx.', // Enhanced description
  authors: [{ name: 'Aahplexx Team', url: 'https://aahplexx.com' }], // Add author metadata
  keywords: ['web platform', 'convert tools', 'music features', 'image gallery', 'creative prompts', 'modern web'], // Add keywords for SEO
  openGraph: {
    title: 'Aahplexx - Modern Web Platform',
    description: 'Your go-to platform for web tools and features.',
    url: 'https://aahplexx.com',
    siteName: 'Aahplexx',
    images: [
      {
        url: 'https://aahplexx.com/og-image.png', // Placeholder - replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'Aahplexx Platform OG Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': 'large',
      'max-image-preview': 'large',
      'max-snippet': 'large',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aahplexx - Modern Web Platform',
    description: 'Your go-to platform for web tools and features.',
    site: '@aahplexx', // Replace with actual Twitter handle if applicable
    creator: '@aahplexxteam', // Replace with actual creator handle
    images: ['https://aahplexx.com/twitter-image.png'], // Placeholder - replace with actual Twitter image
  },
  icons: {
    icon: '/favicon.ico', // Default favicon
    apple: '/apple-touch-icon.png', // Apple touch icon
    // Add more icon sizes and types as needed
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}> {/* Apply font variable to html for optimization */}
      <body className="bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-50 antialiased"> {/* Base body styles */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary> {/* Wrap content with ErrorBoundary */}
            <div className="relative min-h-screen flex flex-col"> {/* Flex container for layout */}
              <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b dark:bg-gray-900/90 dark:border-gray-800">
                <div className="container flex items-center h-16 justify-between">
                  <Navigation />
                </div>
              </header>
              <main className="flex-grow container py-10 md:py-20"> {/* main takes remaining space */}
                {children}
              </main>
              <Footer />
              <div className="fixed top-4 right-4 z-50"> {/* ThemeSwitcher at top right */}
                <ThemeSwitcher />
              </div>
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
