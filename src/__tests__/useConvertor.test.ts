import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useConvertor } from '../hooks/useConvertor'

// Моки для зовнішніх залежностей
vi.mock('potrace', () => ({
  trace: vi.fn((data, callback) => {
    // Симулюємо успішну конвертацію
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

  it('повинен ініціалізуватися з правильними початковими значеннями', () => {
    const { result } = renderHook(() => useConvertor())

    expect(result.current.images).toEqual([])
    expect(result.current.svgs).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('повинен обробляти завантаження зображень', async () => {
    const { result } = renderHook(() => useConvertor())

    const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as React.ChangeEvent<HTMLInputElement>

    // Мокуємо FileReader
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      onload: null as any,
      result: 'data:image/png;base64,test'
    }
    global.FileReader = vi.fn(() => mockFileReader) as any

    await act(async () => {
      result.current.handleImageUpload(mockEvent)
    })

    // Симулюємо завершення читання файлу
    await act(async () => {
      mockFileReader.onload({ target: { result: 'data:image/png;base64,test' } })
    })

    expect(result.current.images).toHaveLength(1)
    expect(result.current.images[0].name).toBe('test.png')
  })

  it('повинен конвертувати зображення в SVG', async () => {
    const { result } = renderHook(() => useConvertor())

    // Спочатку додаємо зображення
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as React.ChangeEvent<HTMLInputElement>

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

    // Тепер конвертуємо
    await act(async () => {
      await result.current.convertToSvg()
    })

    expect(result.current.svgs).toHaveLength(1)
    expect(result.current.svgs[0].name).toBe('test.svg')
    expect(result.current.svgs[0].data).toBe('<svg>test</svg>')
    expect(result.current.isLoading).toBe(false)
  })

  it('повинен встановлювати isLoading під час конвертації', async () => {
    const { result } = renderHook(() => useConvertor())

    // Додаємо зображення
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as React.ChangeEvent<HTMLInputElement>

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

    // Перевіряємо початковий стан
    expect(result.current.isLoading).toBe(false)

    // Запускаємо конвертацію
    act(() => {
      result.current.convertToSvg()
    })

    // Перевіряємо, що isLoading встановлюється в true
    expect(result.current.isLoading).toBe(true)

    // Чекаємо завершення конвертації
    await act(async () => {
      // Даємо час для завершення асинхронної операції
      await new Promise(resolve => setTimeout(resolve, 20))
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('повинен завантажувати всі SVG файли', async () => {
    const { result } = renderHook(() => useConvertor())

    // Мокуємо DOM API
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

    // Створюємо тестові SVG через конвертацію
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' })
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as React.ChangeEvent<HTMLInputElement>

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
