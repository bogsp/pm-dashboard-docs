import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from './components/docs/CodeBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map markdown code blocks to our CodeBlock component
    pre: ({ children, ...props }: any) => {
      // Extract code and language from the pre > code structure
      const code = children?.props?.children || ''
      const className = children?.props?.className || ''
      const language = className.replace('language-', '') || 'typescript'

      return <CodeBlock code={String(code).trim()} language={language} />
    },
    // Allow using CodeBlock directly in MDX
    CodeBlock,
    ...components,
  }
}
