import {ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {ConverterContext} from '../context/ConverterContext';
import {ConverterContextType} from '../types/ConverterTypes';
import {vi} from 'vitest';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  contextValue?: Partial<ConverterContextType>;
}

export const createMockContext = (
  overrides: Partial<ConverterContextType> = {},
): ConverterContextType => ({
  images: [],
  svgs: [],
  isLoading: false,
  handleImageUpload: vi.fn(),
  convertToSvg: vi.fn(),
  downloadAllSvgs: vi.fn(),
  ...overrides,
});

export const renderWithContext = (
  ui: ReactElement,
  options: CustomRenderOptions = {},
) => {
  const {contextValue = {}, ...renderOptions} = options;

  const Wrapper = ({children}: {children: React.ReactNode}) => (
    <ConverterContext.Provider value={createMockContext(contextValue)}>
      {children}
    </ConverterContext.Provider>
  );

  return render(ui, {wrapper: Wrapper, ...renderOptions});
};

export const createMockFile = (name: string, type: string = 'image/png') => {
  return new File(['test content'], name, {type});
};

export const createMockEvent = (files: File[]) => {
  return {
    target: {files},
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  } as unknown as React.ChangeEvent<HTMLInputElement>;
};

export const createMockFileReader = () => {
  const mockFileReader: Partial<FileReader> = {
    readAsDataURL: vi.fn(),
    onload: null,
    result: 'data:image/png;base64,test',
  };

  global.FileReader = vi.fn(
    () => mockFileReader as unknown as FileReader,
  ) as unknown as typeof FileReader;

  return mockFileReader as unknown as FileReader;
};

export * from '@testing-library/react';
