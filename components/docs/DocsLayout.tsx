import { Sidebar } from './Sidebar'
import { Separator } from '@/components/ui/separator'
import { buildNavigation } from '@/lib/docs'

interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function DocsLayout({ children, title, description }: DocsLayoutProps) {
  // Build navigation on server side
  const navigation = buildNavigation()
  
  return (
    <div className="flex min-h-screen">
      <Sidebar navigation={navigation} />
      
      <main className="flex-1 mx-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
          {/* Page Header */}
          {(title || description) && (
            <div className="mb-8">
              {title && (
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-lg text-gray-600">
                  {description}
                </p>
              )}
              <Separator className="mt-6" />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            {children}
          </div>

          {/* Footer */}
          <Separator className="mt-12 mb-6" />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>© 2025 PM Dashboard. All rights reserved.</p>
            <a 
              href="https://bogs-pmd.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              View Live Demo →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}