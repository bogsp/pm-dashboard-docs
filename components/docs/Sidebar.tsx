'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu, X } from 'lucide-react'
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
        const hasActivePage = item.items.some((subItem) => pathname === subItem.href)
        if (hasActivePage) {
          expanded.push(item.title)
        }
      }
    })
    return expanded
  }

  const [expandedSections, setExpandedSections] = useState<string[]>(getInitialExpandedSections())

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 bg-black/20 z-40 w-full h-full border-0 p-0 cursor-default"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false)
          }}
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-background border-r',
          'transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Title */}
          <div className="p-6 border-b">
            <Link href="/" className="block">
              <h2 className="text-xl font-semibold">PM Dashboard</h2>
              <p className="text-sm text-muted-foreground">Documentation</p>
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <div key={item.href}>
                  {item.items ? (
                    // Section with sub-items
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        onClick={() => toggleSection(item.title)}
                        className="w-full justify-between font-medium"
                      >
                        {item.title}
                        <ChevronRight
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedSections.includes(item.title) && 'rotate-90'
                          )}
                        />
                      </Button>
                      {expandedSections.includes(item.title) && (
                        <div className="ml-4 space-y-1">
                          {item.items.map((subItem) => (
                            <Button
                              key={subItem.href}
                              variant="ghost"
                              asChild
                              className={cn(
                                'w-full justify-start text-muted-foreground hover:text-foreground',
                                pathname === subItem.href && 'bg-accent text-accent-foreground'
                              )}
                            >
                              <Link href={subItem.href}>
                                {subItem.title}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Simple link
                    <Button
                      variant="ghost"
                      asChild
                      className={cn(
                        'w-full justify-start font-medium',
                        pathname === item.href && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <Link href={item.href}>
                        {item.title}
                      </Link>
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