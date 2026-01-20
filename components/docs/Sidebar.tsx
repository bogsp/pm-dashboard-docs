'use client'

import { BookOpen, ChevronRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

interface SidebarProps {
  navigation: NavItem[]
}

export function Sidebar({ navigation }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Auto-expand sections that contain the current page
  const getInitialExpandedSections = () => {
    const expanded: string[] = []
    navigation.forEach((item) => {
      if (item.items) {
        const hasActivePage = item.items.some(
          (subItem) => pathname === subItem.href,
        )
        if (hasActivePage) {
          expanded.push(item.title)
        }
      }
    })
    return expanded
  }

  const [expandedSections, setExpandedSections] = useState<string[]>(
    getInitialExpandedSections(),
  )

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant='outline'
        size='icon'
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 bg-background border-border shadow-sm'
        aria-label='Toggle menu'
      >
        {isOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <button
          type='button'
          className='lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 w-full h-full border-0 p-0 cursor-default'
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false)
          }}
          aria-label='Close menu'
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-background border-r border-border',
          'transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className='flex flex-col h-full'>
          {/* Logo/Title */}
          <div className='p-6 border-b border-border/40'>
            <Link href='/' className='flex items-center gap-2 group'>
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors'>
                <BookOpen className='h-4 w-4' />
              </div>
              <div>
                <h2 className='text-sm font-semibold leading-none'>
                  PM Dashboard
                </h2>
                <p className='text-xs text-muted-foreground mt-1'>
                  Documentation
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className='flex-1 px-4 py-4'>
            <nav className='space-y-1'>
              {navigation.map((item) => (
                <div key={item.href} className='mb-2'>
                  {item.items ? (
                    // Section with sub-items
                    <div className='space-y-1'>
                      <Button
                        variant='ghost'
                        onClick={() => toggleSection(item.title)}
                        className='w-full justify-between font-semibold h-9 px-3 hover:bg-muted/50'
                      >
                        {item.title}
                        <ChevronRight
                          className={cn(
                            'h-4 w-4 text-muted-foreground transition-transform duration-200',
                            expandedSections.includes(item.title) &&
                              'rotate-90',
                          )}
                        />
                      </Button>

                      {/* Animated expansion could go here, but conditional rendering is safer for now */}
                      {expandedSections.includes(item.title) && (
                        <div className='ml-2 pl-3 border-l border-border/40 space-y-1 mt-1'>
                          {item.items.map((subItem) => (
                            <Button
                              key={subItem.href}
                              variant='ghost'
                              asChild
                              className={cn(
                                'w-full justify-start h-8 px-3 text-sm font-normal',
                                pathname === subItem.href
                                  ? 'bg-primary/10 text-primary font-medium hover:bg-primary/15 hover:text-primary'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-transparent',
                              )}
                            >
                              <Link href={subItem.href}>{subItem.title}</Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Simple link (Top level)
                    <Button
                      variant='ghost'
                      asChild
                      className={cn(
                        'w-full justify-start font-semibold h-9 px-3',
                        pathname === item.href && 'bg-primary/10 text-primary',
                      )}
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </Button>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>
    </>
  )
}
