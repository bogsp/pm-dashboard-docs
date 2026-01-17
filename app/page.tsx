import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, Code, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg" />
            <span className="text-xl font-bold">PM Dashboard</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-gray-600 hover:text-gray-900">
              Documentation
            </Link>
            <Link href="/docs/getting-started">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold tracking-tight mb-6">
          PM Dashboard
          <span className="block text-blue-600 mt-2">Documentation</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          A minimalist project management tool built with Next.js, React, and TypeScript.
          Clean, focused, and developer-friendly.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/docs/getting-started">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Fast & Lightweight</h3>
            </div>
            <p className="text-gray-600">
              Built with performance in mind. Minimal dependencies, maximum efficiency.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Developer First</h3>
            </div>
            <p className="text-gray-600">
              TypeScript, modern React, clean code. Built by developers, for developers.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Well Documented</h3>
            </div>
            <p className="text-gray-600">
              Comprehensive docs with examples, API references, and guides.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/docs/getting-started" className="group">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                Getting Started →
              </h3>
              <p className="text-gray-600">
                Install PM Dashboard and create your first project in minutes.
              </p>
            </div>
          </Link>

          <Link href="/docs/core-concepts" className="group">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                Core Concepts →
              </h3>
              <p className="text-gray-600">
                Learn the fundamental concepts behind PM Dashboard.
              </p>
            </div>
          </Link>

          <Link href="/docs/components" className="group">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                Components →
              </h3>
              <p className="text-gray-600">
                Explore all available components and their APIs.
              </p>
            </div>
          </Link>

          <Link href="/docs/examples" className="group">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                Examples →
              </h3>
              <p className="text-gray-600">
                Real-world examples and implementation patterns.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-gray-600">
          <p>© 2025 PM Dashboard. Built with Next.js.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/bogsp/pm-dashboard-docs" className="hover:text-gray-900">
              GitHub
            </a>
            <Link href="/docs" className="hover:text-gray-900">
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}