import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Title } from '../components/ConverterTitle'

describe('ConverterTitle', () => {
  it('повинен відображати правильний заголовок', () => {
    render(<Title />)
    
    expect(screen.getByText('PNG to SVG Converter')).toBeInTheDocument()
  })

  it('повинен мати правильну структуру HTML', () => {
    render(<Title />)
    
    const titleElement = screen.getByRole('heading', { level: 1 })
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('PNG to SVG Converter')
  })

  it('повинен мати правильні CSS класи', () => {
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
