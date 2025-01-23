import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"

export default function SQLIntermediateModule() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Intermediate SQL</h1>
      <p className="text-xl text-gray-600 mb-8">Master JOINs, GROUP BY, and aggregate functions</p>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">JOIN Operations</h2>
          <p className="text-gray-600 mb-6">
            JOINs allow you to combine rows from two or more tables based on a related column between them.
          </p>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Exercises</h3>
            <div className="space-y-4 border-l-4 border-blue-500 pl-4">
              <div>
                <p className="font-medium">Exercise 1: INNER JOIN</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    💡 Write a query to join orders and customers tables to get customer details with their orders
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>
                      SELECT orders.order_id, customers.name, orders.order_date
                      FROM orders
                      INNER JOIN customers 
                      ON orders.customer_id = customers.id;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">GROUP BY and Aggregation</h2>
          <p className="text-gray-600 mb-6">
            GROUP BY groups rows that have the same values. Often used with aggregate functions like COUNT, MAX, MIN, SUM, AVG.
          </p>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Exercises</h3>
            <div className="space-y-4 border-l-4 border-blue-500 pl-4">
              <div>
                <p className="font-medium">Exercise 1: Basic Aggregation</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    💡 Write a query to find the total number of orders per customer
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>
                      SELECT customer_id, COUNT(*) as total_orders
                      FROM orders
                      GROUP BY customer_id;
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium">Exercise 2: Advanced Aggregation</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    💡 Find the total amount spent by each customer
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>
                      SELECT 
                        customer_id,
                        COUNT(*) as order_count,
                        SUM(amount) as total_spent,
                        AVG(amount) as avg_order_value
                      FROM orders
                      GROUP BY customer_id
                      HAVING COUNT(*) > 1;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/course/module-1'}
        >
          Previous Module
        </Button>
        <Button
          variant="default"
          onClick={() => window.location.href = '/course/module-3'}
        >
          Next Module
        </Button>
      </div>
    </div>
  )
}
