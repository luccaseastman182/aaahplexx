import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"

export default function SQLBasicsModule() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">SQL Fundamentals</h1>
      <p className="text-xl text-gray-600 mb-8">Learn the basics of SQL including SELECT, FROM, WHERE clauses</p>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Understanding Databases</h2>
          <p className="text-gray-600 mb-6">
            A database is an organized collection of structured information or data. SQL (Structured Query Language) 
            is the standard language for managing and manipulating relational databases.
          </p>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Exercises</h3>
            <div className="space-y-4 border-l-4 border-blue-500 pl-4">
              <div>
                <p className="font-medium">Exercise 1: Basic SELECT Query</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">💡 Write a query to select all columns from the "users" table</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>SELECT * FROM users;</code>
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium">Exercise 2: Selecting Specific Columns</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">💡 Write a query to select only name and email from users</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>SELECT name, email FROM users;</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">WHERE Clause</h2>
          <p className="text-gray-600 mb-6">
            The WHERE clause is used to filter records based on specific conditions.
          </p>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Exercises</h3>
            <div className="space-y-4 border-l-4 border-blue-500 pl-4">
              <div>
                <p className="font-medium">Exercise: Filtering Data</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">💡 Write a query to find all users older than 25</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>SELECT * FROM users WHERE age > 25;</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" disabled>
          Previous Module
        </Button>
        <Button
          variant="default"
          onClick={() => window.location.href = '/course/module-2'}
        >
          Next Module
        </Button>
      </div>
    </div>
  )
}
