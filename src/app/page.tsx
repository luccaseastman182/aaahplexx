import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight text-center lg:text-5xl">
        Welcome to <span className="text-primary">Aahplexx</span>
      </h1>
      <p className="max-w-[70%] text-gray-500 md:text-lg dark:text-gray-400 text-center">
        A modern web platform with a range of tools and features for your daily needs.
      </p>
      <div className="flex gap-4">
        <Link href="/convert">
          <Button variant="outline">
            Explore Convert Tools
          </Button>
        </Link>
        <Link href="/music">
          <Button variant="outline">
            Discover Music Features
          </Button>
        </Link>
        <Link href="/gallery">
          <Button variant="outline">
            View Gallery
          </Button>
        </Link>
        <Link href="/prompts">
          <Button variant="outline">
            Use Prompts
          </Button>
        </Link>
      </div>
    </div>
  )
}
