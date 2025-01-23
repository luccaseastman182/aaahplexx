'use client'

import { useEffect } from 'react'
import { Button } from "@/app/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {error.message || 'An error occurred while loading the course content.'}
      </p>
      <div className="space-x-4">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/course'}
        >
          Return to Courses
        </Button>
        <Button
          variant="default"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
