import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Converter } from '../components/Converter'

vi.mock('../hooks/useConvertor', () => ({
  useConvertor: vi.fn(() => ({
    images: [],
    svgs: [],
    isLoading: false,
    handleImageUpload: vi.fn(),
    convertToSvg: vi.fn(),
    downloadAllSvgs: vi.fn(),
  }))
}))

describe('Converter', () => {
  it('should render child components', () => {
    render(
      <Converter>
        <div data-testid="test-child">Test Child</div>
      </Converter>
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('should have correct DOM structure', () => {
    render(
      <Converter>
        <div>Test</div>
      </Converter>
    )

    const testElement = screen.getByText('Test')
    const parentContainer = testElement.parentElement
    expect(parentContainer).toBeInTheDocument()
  })

  it('should render without errors', () => {
    expect(() => {
      render(
        <Converter>
          <div>Test</div>
        </Converter>
      )
    }).not.toThrow()
  })
})
