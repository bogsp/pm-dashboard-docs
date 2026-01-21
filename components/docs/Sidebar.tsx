'use client'

import { BookOpen, ChevronRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
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

  // Close sidebar on route change (mobile)
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is used as a trigger to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
      {/* Mobile Header - Visible only on mobile */}
      <div className='lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4'>
        <div className='flex items-center gap-3'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Toggle menu'
            className='-ml-2'
          >
            {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </Button>
          <span className='font-semibold text-sm'>PM Dashboard</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-background border-r border-border',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          // On mobile, the sidebar sits below the header if you prefer,
          // or covers it. Here we let it cover full height for cleaner nav space.
        )}
      >
        <div className='flex flex-col h-full'>
          {/* Logo/Title (Desktop only usually, but good to keep for drawer context) */}
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
            <nav className='space-y-1 pb-10'>
              {navigation.map((item) => (
                <div key={item.href} className='mb-2'>
                  {item.items ? (
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
