import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Title } from '../components/ConverterTitle'

describe('ConverterTitle', () => {
  it('should display correct title', () => {
    render(<Title />)
    
    expect(screen.getByText('PNG to SVG Converter')).toBeInTheDocument()
  })

  it('should have correct HTML structure', () => {
    render(<Title />)
    
    const titleElement = screen.getByRole('heading', { level: 1 })
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('PNG to SVG Converter')
  })

  it('should have correct CSS classes', () => {
    render(<Title />)
    
    const titleElement = screen.getByRole('heading', { level: 1 })
    expect(titleElement).toHaveClass(
      'font-eduBeginner',
      'mb-4',
      'text-center',
      'text-2xl',
      'font-bold',
      'md:mb-8'
    )
  })
})
