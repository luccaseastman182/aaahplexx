import { notFound } from 'next/navigation'
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { sqlModules, type ModuleId } from '@/lib/courses/sql-course'
import React from 'react'

// Generate static params for all modules at build time
export async function generateStaticParams() {
  return Object.keys(sqlModules).map((moduleId) => ({
    courseid: moduleId,
  }))
}

interface PageProps {
  params: Promise<{
    courseid: string
  }>
}

export default async function CoursePage({ params }: PageProps) {
  const { courseid } = await params
  const module = sqlModules[courseid as ModuleId]

  if (!module) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">{module.title}</h1>
      <p className="text-xl text-gray-600 mb-8">{module.description}</p>

      <div className="space-y-8">
        {module.lessons.map((lesson) => (
          <Card key={lesson.id} className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{lesson.title}</h2>
            <div className="prose dark:prose-invert max-w-none mb-6">
              {lesson.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-600">{paragraph.trim()}</p>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Exercises</h3>
              {lesson.exercises.map((exercise) => (
                <div key={exercise.id} className="space-y-4 border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">{exercise.question}</p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      💡 Hint: {exercise.hint}
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{exercise.solution}</code>
                    </pre>
                    {exercise.explanation && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        📝 {exercise.explanation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          disabled={module.id === 'module-1'}
          onClick={() => window.location.href = `/course/module-${parseInt(module.id.split('-')[1]) - 1}`}
        >
          Previous Module
        </Button>
        <Button
          variant="default"
          disabled={module.id === 'module-3'}
          onClick={() => window.location.href = `/course/module-${parseInt(module.id.split('-')[1]) + 1}`}
        >
          Next Module
        </Button>
      </div>
    </div>
  )
}
