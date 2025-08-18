import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FilesInput } from '../components/ConverterFilesInput'
import { ConverterContext } from '../context/ConverterContext'

describe('ConverterFilesInput', () => {
  const mockHandleImageUpload = vi.fn()

  const mockContextValue = {
    images: [],
    svgs: [],
    isLoading: false,
    handleImageUpload: mockHandleImageUpload,
    convertToSvg: vi.fn(),
    downloadAllSvgs: vi.fn(),
  }

  const renderWithContext = () => {
    return render(
      <ConverterContext.Provider value={mockContextValue}>
        <FilesInput />
      </ConverterContext.Provider>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display correct text', () => {
    renderWithContext()
    
    expect(screen.getByText('Drag and drop or click to select images')).toBeInTheDocument()
  })

  it('should have input with correct attributes', () => {
    renderWithContext()
    
    const fileInput = screen.getByDisplayValue('')
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).toHaveAttribute('accept', 'image/png')
    expect(fileInput).toHaveAttribute('multiple')
  })

  it('should call handleImageUpload when file changes', () => {
    renderWithContext()
    
    const fileInput = screen.getByDisplayValue('')
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
    
    fireEvent.change(fileInput, { target: { files: [mockFile] } })
    
    expect(mockHandleImageUpload).toHaveBeenCalled()
    expect(mockHandleImageUpload).toHaveBeenCalledTimes(1)
  })

  it('should have correct CSS classes', () => {
    renderWithContext()
    
    const container = screen.getByText('Drag and drop or click to select images').parentElement?.parentElement
    expect(container).toHaveClass('border-mainText', 'relative', 'min-h-40', 'w-full')
  })

  it('should display upload icon', () => {
    renderWithContext()
    
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})
