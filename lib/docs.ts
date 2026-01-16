import fs from 'node:fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content/docs')

export interface DocMeta {
  title: string
  description?: string
}

export interface DocContent {
  slug: string[]
  meta: DocMeta
  content: string
}

// Read _meta.json file
export function readMetaFile(dir: string): Record<string, any> {
  const metaPath = path.join(dir, '_meta.json')
  if (fs.existsSync(metaPath)) {
    const metaContent = fs.readFileSync(metaPath, 'utf8')
    return JSON.parse(metaContent)
  }
  return {}
}

// Get all doc paths for static generation
export function getAllDocPaths(dir: string = docsDirectory, basePath: string[] = []): string[][] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const paths: string[][] = []

  for (const entry of entries) {
    if (entry.name.startsWith('_')) continue // Skip _meta.json

    if (entry.isDirectory()) {
      // Recursively get paths from subdirectories
      const subPaths = getAllDocPaths(path.join(dir, entry.name), [...basePath, entry.name])
      paths.push(...subPaths)
    } else if (entry.name.endsWith('.mdx')) {
      // Add file path (without .mdx extension)
      const slug = entry.name.replace('.mdx', '')
      paths.push([...basePath, slug])
    }
  }

  return paths
}

// Get content for a specific doc
export function getDocContent(slug: string[]): DocContent | null {
  const filePath = path.join(docsDirectory, ...slug) + '.mdx'
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    meta: data as DocMeta,
    content,
  }
}

// Build navigation tree from _meta.json files
export function buildNavigation(dir: string = docsDirectory, basePath: string[] = []): any[] {
  const meta = readMetaFile(dir)
  const nav: any[] = []

  for (const [key, value] of Object.entries(meta)) {
    const itemPath = path.join(dir, key)
    
    if (fs.existsSync(itemPath) && fs.statSync(itemPath).isDirectory()) {
      // It's a section with sub-items
      const subNav = buildNavigation(itemPath, [...basePath, key])
      nav.push({
        title: typeof value === 'string' ? value : value,
        href: `/docs/${[...basePath, key].join('/')}`,
        items: subNav,
      })
    } else {
      // It's a single page
      nav.push({
        title: value,
        href: `/docs/${[...basePath, key].join('/')}`,
      })
    }
  }

  return nav
}