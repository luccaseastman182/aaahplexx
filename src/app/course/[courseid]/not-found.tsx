import Link from 'next/link'
import { Button } from "@/app/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Sorry, the course module you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href="/course">
          Return to Course List
        </Link>
      </Button>
    </div>
  )
}
