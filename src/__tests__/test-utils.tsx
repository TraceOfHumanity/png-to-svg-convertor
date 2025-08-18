import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ConverterContext } from '../context/ConverterContext'
import { ConverterContextType } from '../types/ConverterTypes'

// Типи для кастомного рендера
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  contextValue?: Partial<ConverterContextType>
}

// Функція для створення мок контексту
export const createMockContext = (overrides: Partial<ConverterContextType> = {}): ConverterContextType => ({
  images: [],
  svgs: [],
  isLoading: false,
  handleImageUpload: vi.fn(),
  convertToSvg: vi.fn(),
  downloadAllSvgs: vi.fn(),
  ...overrides,
})

// Кастомний рендер з провайдером контексту
export const renderWithContext = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { contextValue = {}, ...renderOptions } = options
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ConverterContext.Provider value={createMockContext(contextValue)}>
      {children}
    </ConverterContext.Provider>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Утиліти для створення мок файлів
export const createMockFile = (name: string, type: string = 'image/png') => {
  return new File(['test content'], name, { type })
}

export const createMockEvent = (files: File[]) => {
  return {
    target: { files },
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  } as unknown as React.ChangeEvent<HTMLInputElement>
}

// Re-export everything
export * from '@testing-library/react'
