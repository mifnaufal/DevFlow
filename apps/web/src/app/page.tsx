import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">DevFlow</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Unified engineering workspace
        </p>
      </div>
      
      <div className="mt-16 space-y-8 text-center">
        <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Welcome to DevFlow</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your all-in-one platform for project management, GitHub integration, 
            and AI-powered engineering insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">📋 Project Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Issues, sprints, kanban boards, and milestones
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">🔗 GitHub Integration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PRs, commits, deployments, and automated workflows
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">🤖 AI Assistant</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Smart summaries, insights, and project intelligence
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
