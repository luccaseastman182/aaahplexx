import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"

export default function SQLAdvancedModule() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Advanced SQL</h1>
      <p className="text-xl text-gray-600 mb-8">Advanced topics including subqueries, window functions, and optimization</p>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Subqueries</h2>
          <p className="text-gray-600 mb-6">
            A subquery is a query nested inside another query. They can be used in various parts of a SQL statement.
          </p>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Exercises</h3>
            <div className="space-y-4 border-l-4 border-blue-500 pl-4">
              <div>
                <p className="font-medium">Exercise 1: Subquery in WHERE Clause</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    💡 Find customers who have placed orders above the average order amount
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>
                      SELECT customer_id, order_amount
                      FROM orders
                      WHERE order_amount > (
                        SELECT AVG(order_amount)
                        FROM orders
                      );
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Window Functions</h2>
          <p className="text-gray-600 mb-6">
            Window functions perform calculations across a set of table rows related to the current row.
          </p>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Exercises</h3>
            <div className="space-y-4 border-l-4 border-blue-500 pl-4">
              <div>
                <p className="font-medium">Exercise 1: ROW_NUMBER</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    💡 Rank customers by their total order amount
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>
                      SELECT 
                        customer_id,
                        order_amount,
                        ROW_NUMBER() OVER (
                          PARTITION BY customer_id 
                          ORDER BY order_amount DESC
                        ) as order_rank
                      FROM orders;
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium">Exercise 2: Running Total</p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    💡 Calculate running total of order amounts for each customer
                  </p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>
                      SELECT 
                        customer_id,
                        order_date,
                        order_amount,
                        SUM(order_amount) OVER (
                          PARTITION BY customer_id 
                          ORDER BY order_date
                        ) as running_total
                      FROM orders;
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
          onClick={() => window.location.href = '/course/module-2'}
        >
          Previous Module
        </Button>
        <Button variant="default" disabled>
          Next Module
        </Button>
      </div>
    </div>
  )
}
