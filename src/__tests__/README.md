# Тести для PNG to SVG Converter

Ця папка містить тести для проекту PNG to SVG Converter, написані з використанням Vitest та React Testing Library.

## Структура тестів

```
src/__tests__/
├── setup.ts                    # Налаштування тестового середовища
├── test-utils.tsx             # Утиліти для тестування
├── useConvertor.test.ts       # Тести для хука useConvertor
├── Converter.test.tsx         # Тести для компонента Converter
├── ConverterTitle.test.tsx    # Тести для компонента ConverterTitle
├── ConverterFilesInput.test.tsx # Тести для компонента ConverterFilesInput
└── README.md                  # Ця документація
```

## Запуск тестів

```bash
# Запуск тестів в режимі watch
npm test

# Запуск тестів один раз
npm run test:run

# Запуск тестів з UI
npm run test:ui

# Запуск тестів з покриттям
npm run test:coverage
```

## Типи тестів

### 1. Тести хуків (useConvertor.test.ts)
- Тестування початкового стану
- Тестування завантаження зображень
- Тестування конвертації в SVG
- Тестування стану завантаження
- Тестування завантаження файлів

### 2. Тести компонентів
- **Converter.test.tsx**: Тестування основного компонента-контейнера
- **ConverterTitle.test.tsx**: Тестування заголовка
- **ConverterFilesInput.test.tsx**: Тестування поля введення файлів

## Утиліти для тестування

### test-utils.tsx
Містить корисні функції для тестування:

- `renderWithContext()` - рендер з провайдером контексту
- `createMockContext()` - створення мок контексту
- `createMockFile()` - створення мок файлу
- `createMockEvent()` - створення мок події

### Приклад використання

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

## Моки

### Зовнішні залежності
- `potrace` - мокується для симуляції конвертації
- `jszip` - мокується для створення ZIP файлів
- `FileReader` - мокується для читання файлів

### DOM API
- `URL.createObjectURL` - мокується для створення URL
- `ResizeObserver` - мокується для спостереження за розміром

## Найкращі практики

1. **Використовуйте `act()` для асинхронних операцій**
2. **Мокуйте зовнішні залежності**
3. **Тестуйте поведінку, а не реалізацію**
4. **Використовуйте семантичні селектори**
5. **Групуйте пов'язані тести в `describe` блоки**

## Приклади тестів

### Тестування хука
```typescript
it('повинен ініціалізуватися з правильними початковими значеннями', () => {
  const { result } = renderHook(() => useConvertor())
  
  expect(result.current.images).toEqual([])
  expect(result.current.isLoading).toBe(false)
})
```

### Тестування компонента
```typescript
it('повинен відображати правильний текст', () => {
  renderWithContext(<MyComponent />)
  
  expect(screen.getByText('Expected Text')).toBeInTheDocument()
})
```

### Тестування подій
```typescript
it('повинен викликати функцію при кліку', () => {
  const mockFn = vi.fn()
  renderWithContext(<MyComponent onClick={mockFn} />)
  
  fireEvent.click(screen.getByRole('button'))
  
  expect(mockFn).toHaveBeenCalled()
})
```
