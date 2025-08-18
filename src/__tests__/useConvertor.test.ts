import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useConvertor } from '../hooks/useConvertor'
import { createMockFileReader, createMockEvent, createMockFile } from './test-utils'

vi.mock('potrace', () => ({
  trace: vi.fn((data, callback) => {
    setTimeout(() => callback(null, '<svg>test</svg>'), 10)
  })
}))

vi.mock('jszip', () => ({
  default: vi.fn().mockImplementation(() => ({
    file: vi.fn(),
    generateAsync: vi.fn().mockResolvedValue(new Blob(['test'], { type: 'application/zip' }))
  }))
}))

describe('useConvertor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useConvertor())

    expect(result.current.images).toEqual([])
    expect(result.current.svgs).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('should handle image upload', async () => {
    const { result } = renderHook(() => useConvertor())

    const mockFile = createMockFile('test.png')
    const mockEvent = createMockEvent([mockFile])
    const mockFileReader = createMockFileReader()

    await act(async () => {
      result.current.handleImageUpload(mockEvent)
    })

    await act(async () => {
      mockFileReader.onload?.({ target: { result: 'data:image/png;base64,test' } } as unknown as ProgressEvent<FileReader>)
    })

    expect(result.current.images).toHaveLength(1)
    expect(result.current.images[0].name).toBe('test.png')
  })

  it('should convert images to SVG', async () => {
    const { result } = renderHook(() => useConvertor())

    const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>

    const mockFileReader = {
      readAsDataURL: vi.fn(),
      onload: null as any,
      result: 'data:image/png;base64,test'
    }
    global.FileReader = vi.fn(() => mockFileReader) as any

    await act(async () => {
      result.current.handleImageUpload(mockEvent)
      mockFileReader.onload({ target: { result: 'data:image/png;base64,test' } })
    })

    await act(async () => {
      await result.current.convertToSvg()
    })

    expect(result.current.svgs).toHaveLength(1)
    expect(result.current.svgs[0].name).toBe('test.svg')
    expect(result.current.svgs[0].data).toBe('<svg>test</svg>')
    expect(result.current.isLoading).toBe(false)
  })

  it('should set isLoading during conversion', async () => {
    const { result } = renderHook(() => useConvertor())

    const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>

    const mockFileReader = {
      readAsDataURL: vi.fn(),
      onload: null as any,
      result: 'data:image/png;base64,test'
    }
    global.FileReader = vi.fn(() => mockFileReader) as any

    await act(async () => {
      result.current.handleImageUpload(mockEvent)
      mockFileReader.onload({ target: { result: 'data:image/png;base64,test' } })
    })

    expect(result.current.isLoading).toBe(false)

    act(() => {
      result.current.convertToSvg()
    })

    expect(result.current.isLoading).toBe(true)

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20))
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('should download all SVG files', async () => {
    const { result } = renderHook(() => useConvertor())

    const mockAnchor = {
      href: '',
      download: '',
      click: vi.fn()
    }
    const mockAppendChild = vi.fn()
    const mockRemoveChild = vi.fn()
    
    Object.defineProperty(document, 'body', {
      value: {
        appendChild: mockAppendChild,
        removeChild: mockRemoveChild
      },
      writable: true
    })
    
    Object.defineProperty(document, 'createElement', {
      value: vi.fn(() => mockAnchor),
      writable: true
    })

    const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>

    const mockFileReader = {
      readAsDataURL: vi.fn(),
      onload: null as any,
      result: 'data:image/png;base64,test'
    }
    global.FileReader = vi.fn(() => mockFileReader) as any

    await act(async () => {
      result.current.handleImageUpload(mockEvent)
      mockFileReader.onload({ target: { result: 'data:image/png;base64,test' } })
      await result.current.convertToSvg()
    })

    await act(async () => {
      result.current.downloadAllSvgs()
    })

    expect(mockAnchor.download).toBe('converted_svgs.zip')
    expect(mockAnchor.click).toHaveBeenCalled()
    expect(mockAppendChild).toHaveBeenCalledWith(mockAnchor)
    expect(mockRemoveChild).toHaveBeenCalledWith(mockAnchor)
  })
})
