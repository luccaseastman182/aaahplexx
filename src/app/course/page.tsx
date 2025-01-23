import { Card } from "@/app/components/ui/card"
import Link from "next/link"

const modules = [
  {
    id: "module-1",
    title: "SQL Fundamentals",
    description: "Learn the basics of SQL including SELECT, FROM, WHERE clauses",
    href: "/course/module-1"
  },
  {
    id: "module-2",
    title: "Intermediate SQL",
    description: "Master JOINs, GROUP BY, and aggregate functions",
    href: "/course/module-2"
  },
  {
    id: "module-3",
    title: "Advanced SQL",
    description: "Advanced topics including subqueries, window functions, and optimization",
    href: "/course/module-3"
  }
]

export default function CoursePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">SQL Learning Path</h1>
      <p className="text-xl text-gray-600 mb-8">
        Choose your module to begin learning SQL - from basics to advanced concepts
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link key={module.id} href={module.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">{module.title}</h2>
              <p className="text-gray-600">{module.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
