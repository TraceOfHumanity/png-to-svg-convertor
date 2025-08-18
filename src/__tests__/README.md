# Tests for PNG to SVG Converter

This folder contains tests for the PNG to SVG Converter project, written using Vitest and React Testing Library.

## Test structure

```
src/__tests__/
├── setup.ts                    # Test environment setup
├── test-utils.tsx             # Test utilities
├── useConvertor.test.ts       # Tests for useConvertor hook
├── Converter.test.tsx         # Tests for Converter component
├── ConverterTitle.test.tsx    # Tests for ConverterTitle component
├── ConverterFilesInput.test.tsx # Tests for ConverterFilesInput component
└── README.md                  # This documentation
```

## Run tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Types of tests

### 1. Hook tests (useConvertor.test.ts)
- Testing initial state
- Testing image loading
- Testing conversion to SVG
- Testing loading state
- Testing file loading

### 2. Component tests
- **Converter.test.tsx**: Testing the main container component
- **ConverterTitle.test.tsx**: Testing the title
- **ConverterFilesInput.test.tsx**: Testing the file input field

## Test utilities

### test-utils.tsx
Contains useful functions for testing:

- `renderWithContext()` - render with a context provider
- `createMockContext()` - create a mock context
- `createMockFile()` - create a mock file
- `createMockEvent()` - create a mock event

### Example usage

```typescript
import { renderWithContext, createMockFile } from './test-utils'

describe('MyComponent', () => {
  it('should work with context', () => {
    const mockContext = {
      images: [createMockFile('test.png')],
      isLoading: false
    }
    
    renderWithContext(<MyComponent />, { contextValue: mockContext })
  })
})
```

## Mocks

### External dependencies
- `potrace` - mocked for simulation of conversion
- `jszip` - mocked for creating ZIP files
- `FileReader` - mocked for reading files

### DOM API
- `URL.createObjectURL` - mocked for creating URL
- `ResizeObserver` - mocked for observing size

## Best practices

1. **Use `act()` for asynchronous operations**
2. **Mock external dependencies**
3. **Test behavior, not implementation**
4. **Use semantic selectors**
5. **Group related tests in `describe` blocks**

## Examples of tests

### Testing a hook
```typescript
it('should initialize with correct default values', () => {
  const { result } = renderHook(() => useConvertor())
  
  expect(result.current.images).toEqual([])
  expect(result.current.isLoading).toBe(false)
})
```

### Testing a component
```typescript
it('should display the correct text', () => {
  renderWithContext(<MyComponent />)
  
  expect(screen.getByText('Expected Text')).toBeInTheDocument()
})
```

### Testing events
```typescript
it('should call a function when clicked', () => {
  const mockFn = vi.fn()
  renderWithContext(<MyComponent onClick={mockFn} />)
  
  fireEvent.click(screen.getByRole('button'))
  
  expect(mockFn).toHaveBeenCalled()
})
```
