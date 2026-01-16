'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ 
  code, 
  language = 'typescript', 
  filename,
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden bg-[#282c34] border-border/50">
      {/* Header with filename and copy button */}
      {(filename || true) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-[#21252b]">
          <span className="text-sm text-gray-400 font-mono">
            {filename || language}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 text-gray-400 hover:text-gray-200 hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}

      {/* Code content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#282c34',
            fontSize: '0.875rem',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </Card>
  )
}