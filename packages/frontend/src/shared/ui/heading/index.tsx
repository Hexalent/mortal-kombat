import { ReactNode } from 'react'
import { clsx } from 'clsx'

type HeadingProps = {
  children: ReactNode
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export const Heading = ({ children, level = 'h1', className = '' }: HeadingProps) => {
  const HeadingTag = level

  const defaultClasses = [
    'font-immortal',
    'text-red-600',
    'text-8xl',
    'leading-none',
    'tracking-tight',
    'uppercase',
    'bg-clip-text',
    'text-transparent',
    'bg-gradient-to-r',
    'from-red-500',
    'to-yellow-500'
  ]

  const combinedClasses = clsx(defaultClasses, ...className.split(' '))

  return <HeadingTag className={combinedClasses}>{children}</HeadingTag>
}
