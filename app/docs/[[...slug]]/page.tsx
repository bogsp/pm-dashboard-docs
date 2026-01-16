import { notFound } from 'next/navigation'
import { DocsLayout } from '@/components/docs/DocsLayout'
import { getDocContent, getAllDocPaths } from '@/lib/docs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { CodeBlock } from '@/components/docs/CodeBlock'

// Components available in MDX
const components = {
  pre: ({ children, ...props }: any) => {
    // Extract code and language from children
    const code = children?.props?.children || ''
    const language = children?.props?.className?.replace('language-', '') || 'typescript'
    
    return <CodeBlock code={String(code).trim()} language={language} />
  },
  CodeBlock,
}

// Generate static params for all doc pages
export async function generateStaticParams() {
  const paths = getAllDocPaths()
  return paths.map((slug) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export default async function DocPage({ params }: PageProps) {
  const { slug = ['introduction'] } = await params
  const doc = getDocContent(slug)

  if (!doc) {
    notFound()
  }

  return (
    <DocsLayout title={doc.meta.title} description={doc.meta.description}>
      <MDXRemote source={doc.content} components={components} />
    </DocsLayout>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug = ['introduction'] } = await params
  const doc = getDocContent(slug)

  if (!doc) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${doc.meta.title} | PM Dashboard Docs`,
    description: doc.meta.description,
  }
}