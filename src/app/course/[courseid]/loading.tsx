import { Card } from "@/app/components/ui/card"
import { Skeleton } from "@/app/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-12 w-2/3 mb-8" />
      <Skeleton className="h-6 w-full mb-8" />

      <div className="space-y-8">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-24 w-full mb-6" />

            <div className="space-y-6">
              <Skeleton className="h-6 w-1/4 mb-4" />
              {[1, 2].map((j) => (
                <div key={j} className="space-y-4 border-l-4 border-blue-500 pl-4">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}
