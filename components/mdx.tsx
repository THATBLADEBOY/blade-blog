import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React, {
  PropsWithChildren,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react'
import { Mermaid } from './mermaid-diagram'
import { RuleSnippet } from './rule-snippet'

/**
 * Table data structure for MDX tables.
 */
export interface TableData {
  headers: ReactNode[]
  rows: ReactNode[][]
}

/**
 * Props for the Table component.
 */
export interface TableProps {
  data: TableData
  columnWidths?: string[]
}

/**
 * Normalizes column widths to ensure they don't exceed 100%.
 * If widths are provided but don't sum to 100%, remaining columns get equal distribution.
 * If total exceeds 100%, all widths are proportionally scaled down.
 */
function normalizeColumnWidths(
  widths: string[] | undefined,
  columnCount: number,
): string[] | undefined {
  if (!widths || widths.length === 0) {
    return undefined
  }

  // Parse percentages and convert to numbers
  const parsedWidths = widths.map((width) => {
    const match = width.match(/^(\d+(?:\.\d+)?)%?$/)
    return match ? parseFloat(match[1]) : 0
  })

  const totalSpecified = parsedWidths.reduce((sum, width) => sum + width, 0)
  const specifiedCount = Math.min(widths.length, columnCount)
  const remainingColumns = columnCount - specifiedCount

  if (totalSpecified > 100) {
    // Scale down proportionally if total exceeds 100%
    const scaleFactor = 100 / totalSpecified
    return parsedWidths
      .slice(0, columnCount)
      .map((width) => `${(width * scaleFactor).toFixed(2)}%`)
  } else if (totalSpecified < 100 && remainingColumns > 0) {
    // Distribute remaining percentage equally among unspecified columns
    const remaining = 100 - totalSpecified
    const remainingPerColumn = remaining / remainingColumns
    const result = [
      ...parsedWidths.slice(0, specifiedCount).map((width) => `${width}%`),
    ]

    for (let i = 0; i < remainingColumns; i++) {
      result.push(`${remainingPerColumn.toFixed(2)}%`)
    }

    return result
  } else {
    // Total is exactly 100% or we have exact column count
    return parsedWidths.slice(0, columnCount).map((width) => `${width}%`)
  }
}

/**
 * Renders a table from MDX content.
 */
export function Table({ data, columnWidths }: TableProps) {
  const normalizedWidths = normalizeColumnWidths(
    columnWidths,
    data.headers.length,
  )

  const headers = data.headers.map((header, index) => (
    <th
      key={index}
      style={normalizedWidths ? { width: normalizedWidths[index] } : undefined}
    >
      {header}
    </th>
  ))

  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

/**
 * Props for the CustomLink component.
 */
export interface CustomLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children?: ReactNode
}

/**
 * Renders a custom link for MDX content, handling internal, anchor, and external links.
 */
export function CustomLink(props: CustomLinkProps) {
  const { href, children, ...rest } = props

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />
}

/**
 * Renders an image with rounded corners for MDX content.
 */
export function RoundedImage(props: ImageProps) {
  return <Image className='rounded-lg' {...props} />
}

/**
 * Props for the Code component.
 */
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string
}

/**
 * Renders syntax-highlighted code for MDX content.
 */
export function Code({ children, ...props }: CodeProps) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

/**
 * Slugifies a string for use as an anchor id.
 */
function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

/**
 * Creates a heading component for a given level with anchor links.
 */
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  /**
   * Blueprint-style heading with anchor link and dashed border.
   * @description Adds a blueprint aesthetic: dashed border, blueprint color, and background.
   */
  const Heading: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const slug = slugify(
      typeof children === 'string'
        ? children
        : React.Children.toArray(children).join(' '),
    )
    return React.createElement(
      `h${level}`,
      { id: slug, className: 'blueprint-header' },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children,
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  Mermaid,
  RuleSnippet,
}

/**
 * Custom MDX renderer with additional components.
 */
export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
