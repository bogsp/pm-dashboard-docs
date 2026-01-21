'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Code,
  FileText,
  type LucideIcon,
  Menu,
  X,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { DocsBackground } from '@/components/docs-background'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface FeatureCardProps {
  title: string
  desc: string
  icon: LucideIcon
  delay?: number
}

// Animated Feature Card
const FeatureCard = ({
  title,
  desc,
  icon: Icon,
  delay = 0,
}: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className='h-full'
  >
    <Card className='group relative overflow-hidden p-8 transition-all hover:border-primary/20 hover:shadow-md h-full flex flex-col justify-center'>
      {/* 
        Wrapper centers the content block visually (mx-auto)
        while keeping text left-aligned. 
        max-w-[300px] ensures the text wraps nicely and doesn't stretch too wide.
      */}
      <div className='flex flex-col mx-auto max-w-[300px] w-full'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors'>
            <Icon className='h-4 w-4' />
          </div>
          <h3 className='text-lg font-semibold text-foreground leading-tight'>
            {title}
          </h3>
        </div>
        <p className='text-sm leading-relaxed text-muted-foreground text-pretty'>
          {desc}
        </p>
      </div>
    </Card>
  </motion.div>
)

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className='min-h-screen flex flex-col relative overflow-x-hidden'>
      <DocsBackground />

      {/* Navigation */}
      <nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <BookOpen className='w-6 h-6 text-primary' />
            <span className='text-lg font-bold tracking-tight'>
              PM Dashboard Docs
            </span>
          </div>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center gap-4'>
            <Link
              href='/docs'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Read Docs
            </Link>
            <Link href='https://bogs-pmd.vercel.app' target='_blank'>
              <Button variant='default' size='sm'>
                Live Demo
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className='flex items-center gap-2 md:hidden'>
            <ThemeToggle />
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label='Toggle menu'
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className='md:hidden border-b border-border bg-background/95 backdrop-blur px-6 overflow-hidden'
            >
              <div className='flex flex-col gap-4 py-6'>
                <Link
                  href='/docs'
                  className='text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center justify-between'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Read Documentation
                  <ArrowRight className='h-4 w-4' />
                </Link>
                <Link
                  href='https://bogs-pmd.vercel.app'
                  target='_blank'
                  className='text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center justify-between'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View Live Demo
                  <Zap className='h-4 w-4' />
                </Link>
                <div className='pt-2'>
                  <Link
                    href='/docs/getting-started'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className='w-full'>Get Started</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Animated */}
      <section className='relative px-6 py-24 md:py-32 text-center max-w-5xl mx-auto z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6'>
            <span className='flex h-2 w-2 rounded-full bg-primary mr-2'></span>
            Developer Resources
          </div>

          <h1 className='text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground'>
            Build faster with <br />
            <span className='text-muted-foreground'>proven patterns.</span>
          </h1>

          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed'>
            Comprehensive documentation for the PM Dashboard. Architecture
            decisions, component APIs, and implementation guides.
          </p>

          <div className='flex items-center justify-center gap-4 flex-col sm:flex-row'>
            <Link href='/docs/getting-started' className='w-full sm:w-auto'>
              <Button size='lg' className='h-12 px-8 text-base w-full'>
                Start Building <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </Link>
            <Link href='/docs' className='w-full sm:w-auto'>
              <Button
                size='lg'
                variant='outline'
                className='h-12 px-8 text-base bg-background/50 w-full'
              >
                Browse API
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid - Animated Stagger */}
      <section className='px-6 py-20 max-w-7xl mx-auto w-full'>
        <div className='grid md:grid-cols-3 gap-6'>
          <FeatureCard
            title='Fast & Lightweight'
            desc='Built with performance in mind. Zero bloat, maximum efficiency using Next.js App Router.'
            icon={Zap}
            delay={0.1}
          />
          <FeatureCard
            title='Developer First'
            desc='Written in TypeScript. Fully typed interfaces, clean component extraction, and modular architecture.'
            icon={Code}
            delay={0.2}
          />
          <FeatureCard
            title='Well Documented'
            desc='Every component and utility function is documented with examples and prop definitions.'
            icon={FileText}
            delay={0.3}
          />
        </div>
      </section>

      {/* Quick Links Section - Animated Stagger */}
      <section className='px-6 py-20 border-t border-border/50 bg-muted/20'>
        <div className='max-w-7xl mx-auto'>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='text-2xl font-bold mb-10 text-center'
          >
            Popular Topics
          </motion.h2>

          <div className='grid md:grid-cols-2 gap-4'>
            {[
              {
                title: 'Getting Started',
                desc: 'Installation and setup guide.',
                href: '/docs/getting-started',
              },
              {
                title: 'Core Concepts',
                desc: 'Architecture and state management.',
                href: '/docs/core-concepts',
              },
              {
                title: 'Components',
                desc: 'UI component library reference.',
                href: '/docs/components',
              },
              {
                title: 'Examples',
                desc: 'Copy-paste implementation patterns.',
                href: '/docs/examples',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Link href={item.href} className='group block h-full'>
                  <div className='h-full bg-card rounded-lg p-6 border border-border hover:border-primary/30 transition-all shadow-sm hover:shadow-md'>
                    <h3 className='text-lg font-semibold mb-1 group-hover:text-primary transition-colors flex items-center'>
                      {item.title}{' '}
                      <ArrowRight className='w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all' />
                    </h3>
                    <p className='text-muted-foreground'>{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Unchanged */}
      <footer className='border-t border-border mt-auto bg-background'>
        <div className='max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground'>
          <p>© 2025 PM Dashboard. Built by Bogs Paulino.</p>
          <div className='flex items-center gap-6 mt-4 md:mt-0'>
            <a
              href='https://github.com/bogsp/pm-dashboard-docs'
              className='hover:text-foreground transition-colors'
            >
              GitHub
            </a>
            <Link
              href='/docs'
              className='hover:text-foreground transition-colors'
            >
              Documentation
            </Link>
            <Link
              href='https://bogs-pmd.vercel.app'
              className='hover:text-foreground transition-colors'
            >
              Live Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
