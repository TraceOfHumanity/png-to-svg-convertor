# Тестування PNG to SVG Converter

## Огляд

Проект використовує **Vitest** та **React Testing Library** для тестування. Всі тести розміщені в папці `src/__tests__/`.

## Швидкий старт

### Встановлення залежностей
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/coverage-v8
```

### Запуск тестів
```bash
# Інтерактивний режим (watch)
npm test

# Одноразовий запуск
npm run test:run

# З UI інтерфейсом
npm run test:ui

# З покриттям коду
npm run test:coverage
```

## Структура тестів

```
src/__tests__/
├── setup.ts                    # Глобальні налаштування
├── test-utils.tsx             # Утиліти для тестування
├── useConvertor.test.ts       # Тести хука (98.48% покриття)
├── Converter.test.tsx         # Тести основного компонента (100% покриття)
├── ConverterTitle.test.tsx    # Тести заголовка (100% покриття)
├── ConverterFilesInput.test.tsx # Тести поля введення (100% покриття)
└── README.md                  # Детальна документація
```

## Покриття коду

Поточне покриття: **60.36%**

### Детальне покриття:
- **useConvertor.ts**: 98.48% (основний хук)
- **Converter.tsx**: 100% (основний компонент)
- **ConverterTitle.tsx**: 100% (заголовок)
- **ConverterFilesInput.tsx**: 100% (поле введення)
- **ConverterContext.tsx**: 100% (контекст)

### Компоненти, що потребують додаткових тестів:
- ConverterAction.tsx (13.04%)
- ConverterImages.tsx (45.45%)
- ConverterLoader.tsx (30%)
- ConverterPngImageList.tsx (16.66%)
- ConverterSvgImageList.tsx (14.28%)

## Типи тестів

### 1. Тести хуків
- Тестування стану
- Тестування асинхронних операцій
- Тестування побічних ефектів

### 2. Тести компонентів
- Тестування рендерингу
- Тестування подій
- Тестування пропсів
- Тестування контексту

### 3. Тести інтеграції
- Тестування взаємодії між компонентами
- Тестування роботи з файлами

## Найкращі практики

### 1. Структура тесту
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Налаштування
  })

  it('повинен робити щось', () => {
    // Тест
  })
})
```

### 2. Використання утиліт
```typescript
import { renderWithContext, createMockFile } from './test-utils'

// Замість звичайного render
renderWithContext(<Component />, { contextValue: mockContext })
```

### 3. Мокування
```typescript
// Мокування зовнішніх залежностей
vi.mock('potrace', () => ({
  trace: vi.fn((data, callback) => callback(null, '<svg>test</svg>'))
}))
```

### 4. Асинхронні тести
```typescript
it('повинен обробляти асинхронну операцію', async () => {
  await act(async () => {
    // Асинхронна операція
  })
  
  expect(result.current.isLoading).toBe(false)
})
```

## Додавання нових тестів

### 1. Створення тесту для хука
```typescript
// src/__tests__/newHook.test.ts
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useNewHook } from '../hooks/useNewHook'

describe('useNewHook', () => {
  it('повинен ініціалізуватися правильно', () => {
    const { result } = renderHook(() => useNewHook())
    expect(result.current.value).toBe(expectedValue)
  })
})
```

### 2. Створення тесту для компонента
```typescript
// src/__tests__/NewComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { NewComponent } from '../components/NewComponent'

describe('NewComponent', () => {
  it('повинен рендерити правильно', () => {
    render(<NewComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## Налаштування

### vitest.config.ts
```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    css: true,
  },
})
```

### setup.ts
```typescript
import '@testing-library/jest-dom'

// Глобальні моки
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
```

## Поширені проблеми

### 1. Помилка "act() without await"
```typescript
// ❌ Неправильно
act(() => {
  result.current.asyncFunction()
})

// ✅ Правильно
await act(async () => {
  await result.current.asyncFunction()
})
```

### 2. Помилка "Cannot find module"
```typescript
// Додайте мок на початку файлу
vi.mock('../path/to/module', () => ({
  default: vi.fn(),
  namedExport: vi.fn(),
}))
```

### 3. Помилка "Element not found"
```typescript
// Використовуйте правильні селектори
screen.getByRole('button') // замість getByText для кнопок
screen.getByTestId('my-element') // для складних елементів
```

## Корисні команди

```bash
# Запуск конкретного тесту
npm test useConvertor

# Запуск тестів з певної папки
npm test src/__tests__/components

# Запуск тестів з виводом деталей
npm test -- --reporter=verbose

# Запуск тестів з порогом покриття
npm run test:coverage -- --coverage.threshold.lines=80
```

## Ресурси

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
