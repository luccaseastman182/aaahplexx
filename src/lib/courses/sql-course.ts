import { z } from 'zod'

// Define the schema for exercises
export const ExerciseSchema = z.object({
  id: z.string(),
  question: z.string(),
  hint: z.string(),
  solution: z.string(),
  explanation: z.string().optional()
})

// Define the schema for lessons
export const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  exercises: z.array(ExerciseSchema)
})

// Define the schema for modules
export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  lessons: z.array(LessonSchema)
})

// Create types from schemas
export type Exercise = z.infer<typeof ExerciseSchema>
export type Lesson = z.infer<typeof LessonSchema>
export type Module = z.infer<typeof ModuleSchema>

// SQL Course Modules
export const sqlModules = {
  'module-1': {
    id: 'module-1',
    title: 'SQL Fundamentals',
    description: 'Learn the basics of SQL including SELECT, FROM, WHERE clauses',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Understanding Databases',
        content: `
          A database is an organized collection of structured information or data. SQL (Structured Query Language) 
          is the standard language for managing and manipulating relational databases.

          Key Concepts:
          - Tables: Data is organized in tables (relations)
          - Rows: Each record in a table
          - Columns: Fields that define the data structure
          - Primary Keys: Unique identifiers for records
          - Foreign Keys: References to other tables
        `,
        exercises: [
          {
            id: 'ex-1-1-1',
            question: 'Write a query to select all columns from the "users" table',
            hint: 'Use the * wildcard with SELECT',
            solution: 'SELECT * FROM users;',
            explanation: 'This query retrieves all columns and all rows from the users table'
          },
          {
            id: 'ex-1-1-2',
            question: 'Select only the name and email columns from the "users" table',
            hint: 'Specify the column names after SELECT',
            solution: 'SELECT name, email FROM users;',
            explanation: 'This query retrieves only the specified columns (name and email) from all rows'
          }
        ]
      },
      {
        id: 'lesson-1-2',
        title: 'WHERE Clause and Filtering',
        content: `
          The WHERE clause is used to filter records based on specific conditions.
          
          Common Operators:
          - Comparison: =, >, <, >=, <=, <>
          - Logical: AND, OR, NOT
          - Pattern Matching: LIKE, IN
          - NULL checking: IS NULL, IS NOT NULL
        `,
        exercises: [
          {
            id: 'ex-1-2-1',
            question: 'Find all users who are 25 years or older',
            hint: 'Use the WHERE clause with a comparison operator',
            solution: 'SELECT * FROM users WHERE age >= 25;',
            explanation: 'This filters users based on the age condition'
          },
          {
            id: 'ex-1-2-2',
            question: 'Find active users with a gmail email address',
            hint: 'Use WHERE with AND and LIKE',
            solution: "SELECT * FROM users WHERE is_active = true AND email LIKE '%@gmail.com';",
            explanation: 'Combines multiple conditions to filter users'
          }
        ]
      }
    ]
  },
  'module-2': {
    id: 'module-2',
    title: 'Intermediate SQL',
    description: 'Master JOINs, GROUP BY, and aggregate functions',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'JOIN Operations',
        content: `
          JOINs combine rows from two or more tables based on a related column.
          
          Types of JOINs:
          - INNER JOIN: Returns matching records from both tables
          - LEFT JOIN: Returns all records from left table and matching from right
          - RIGHT JOIN: Returns all records from right table and matching from left
          - FULL JOIN: Returns all records when there's a match in either table
        `,
        exercises: [
          {
            id: 'ex-2-1-1',
            question: 'Join orders and customers tables to get customer details with their orders',
            hint: 'Use INNER JOIN with ON clause',
            solution: `
              SELECT 
                orders.order_id,
                customers.name,
                orders.order_date,
                orders.amount
              FROM orders
              INNER JOIN customers ON orders.customer_id = customers.id;
            `,
            explanation: 'Combines order data with customer information using a common customer_id'
          }
        ]
      },
      {
        id: 'lesson-2-2',
        title: 'Aggregation and GROUP BY',
        content: `
          GROUP BY groups rows that have the same values in specified columns.
          Often used with aggregate functions:
          - COUNT(): Counts rows
          - SUM(): Adds values
          - AVG(): Calculates average
          - MAX(): Finds maximum value
          - MIN(): Finds minimum value
        `,
        exercises: [
          {
            id: 'ex-2-2-1',
            question: 'Calculate total orders and revenue per customer',
            hint: 'Use GROUP BY with multiple aggregate functions',
            solution: `
              SELECT 
                customer_id,
                COUNT(*) as total_orders,
                SUM(amount) as total_revenue,
                AVG(amount) as avg_order_value
              FROM orders
              GROUP BY customer_id;
            `,
            explanation: 'Groups orders by customer and calculates various metrics'
          }
        ]
      }
    ]
  },
  'module-3': {
    id: 'module-3',
    title: 'Advanced SQL',
    description: 'Advanced topics including subqueries, window functions, and optimization',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Subqueries',
        content: `
          A subquery is a query nested inside another query.
          Types of subqueries:
          - Scalar: Returns a single value
          - Row: Returns a single row
          - Table: Returns a result set
          - Correlated: References outer query
        `,
        exercises: [
          {
            id: 'ex-3-1-1',
            question: 'Find customers who have placed orders above the average order amount',
            hint: 'Use a subquery to calculate the average',
            solution: `
              SELECT customer_id, order_amount
              FROM orders
              WHERE order_amount > (
                SELECT AVG(order_amount)
                FROM orders
              );
            `,
            explanation: 'Uses a scalar subquery to compare against the average'
          }
        ]
      },
      {
        id: 'lesson-3-2',
        title: 'Window Functions',
        content: `
          Window functions perform calculations across a set of table rows.
          Common window functions:
          - ROW_NUMBER(): Assigns unique number to rows
          - RANK(): Assigns rank with gaps
          - DENSE_RANK(): Assigns rank without gaps
          - LAG/LEAD(): Access previous/next rows
        `,
        exercises: [
          {
            id: 'ex-3-2-1',
            question: 'Rank customers by their total order amount',
            hint: 'Use ROW_NUMBER() or RANK()',
            solution: `
              SELECT 
                customer_id,
                total_amount,
                RANK() OVER (ORDER BY total_amount DESC) as customer_rank
              FROM (
                SELECT 
                  customer_id,
                  SUM(amount) as total_amount
                FROM orders
                GROUP BY customer_id
              ) customer_totals;
            `,
            explanation: 'Uses window function to rank customers by their total spend'
          }
        ]
      }
    ]
  }
} as const

// Type for module IDs
export type ModuleId = keyof typeof sqlModules

// Validate modules against schema
Object.values(sqlModules).forEach(module => {
  ModuleSchema.parse(module)
})
