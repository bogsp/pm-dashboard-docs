import { ArrowRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Separator } from '@/components/ui/separator'
import { buildNavigation } from '@/lib/docs'
import { DocsContent } from './DocsContent'
import { Sidebar } from './Sidebar'

interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function DocsLayout({ children, title, description }: DocsLayoutProps) {
  const navigation = buildNavigation()

  return (
    <div className='flex min-h-screen relative bg-background'>
      <Sidebar navigation={navigation} />

      {/* Main Content Area */}
      {/* Added pt-16 for mobile header clearance */}
      <main className='flex-1 mx-auto w-full min-w-0 relative pt-16 lg:pt-0'>
        
        {/* Desktop Theme Toggle - Hidden on Mobile */}
        <div className='hidden lg:block absolute top-6 right-6 z-10'>
          <ThemeToggle />
        </div>

        <div className='max-w-4xl mx-auto px-6 py-10 lg:px-12'>
          {/* Header */}
          {(title || description) && (
            <DocsContent>
              <div className='mb-10 pr-12'>
                {title && (
                  <h1 className='text-4xl font-bold tracking-tight text-foreground mb-3'>
                    {title}
                  </h1>
                )}
                {description && (
                  <p className='text-xl text-muted-foreground leading-relaxed'>
                    {description}
                  </p>
                )}
                <Separator className='mt-8' />
              </div>
            </DocsContent>
          )}

          {/* Content */}
          <DocsContent>
            <div
              className='prose prose-zinc dark:prose-invert max-w-none 
              prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground
              prose-p:text-foreground/80
              prose-li:text-foreground/80
              prose-strong:text-foreground prose-strong:font-bold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800
              prose-img:rounded-lg prose-img:border prose-img:border-border
              prose-hr:border-border
            '
            >
              {children}
            </div>
          </DocsContent>

          {/* Footer */}
          <div className='mt-16 pt-8 border-t border-border'>
            <div className='flex justify-between items-center text-sm text-muted-foreground'>
              <p>© 2025 PM Dashboard Docs</p>
              <a
                href='https://bogs-pmd.vercel.app'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-foreground transition-colors flex items-center'
              >
                View Live Demo <ArrowRight className='w-4 h-4 ml-1' />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}