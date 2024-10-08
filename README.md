## Скрипты

Проект включает в себя несколько команд для разработки и сборки:

- **Запуск разработки**:
  ```bash
  npm run dev
  ```
  Запускает сервер и приложение одновременно.

- **Запуск приложения**:
  ```bash
  npm run start
  ```
  Запускает приложение в режиме разработки.


- **Запуск сервера**:
  ```bash
    npm run server
  ```
  Запускает JSON-сервер на порту 3000.

  **Сборка Docker-образа:**
```bash
    docker build -t my-vite-react-app .
 ```

**Запуск Docker-контейнера:**
```bash
    docker run -p 3000:3000 -p 4173:4173 my-vite-react-app
 ```

## Зависимости

### Основные зависимости

- [React](https://reactjs.org/) - Библиотека для построения пользовательских интерфейсов.
- [Vite](https://vitejs.dev/) - Современный сборщик для разработки.
- [Material-UI](https://mui.com/) - Компоненты пользовательского интерфейса.
- [React Hook Form](https://react-hook-form.com/) - Управление формами в React.
- [Zod](https://zod.dev/) - Схемы валидации для TypeScript.

### Разработка

- [ESLint](https://eslint.org/) - Инструмент для анализа кода.
- [TypeScript](https://www.typescriptlang.org/) - Надстройка над JavaScript.
- [Concurrently](https://github.com/open-cli-tools/concurrently) - Запуск нескольких команд одновременно.

# Проблема с маршрутизацией в проекте

## Описание проблемы

В процессе разработки функционала для страницы объявлений возникла проблема с маршрутизацией. Цель заключалась в том, чтобы при клике на кнопку **“Заказы”** в карточке товара происходил переход в раздел **Заказы**, где отображаются все заказы, содержащие выбранный товар.

### Ожидаемое поведение

При нажатии на кнопку **“Заказы”** в карточке товара, приложение должно было перенаправлять пользователя на страницу заказов с фильтрацией по конкретному товару. Например, маршрут должен был выглядеть следующим образом:
/orders-with-item/:itemId где `:itemId` — это идентификатор товара.

### Проблема

Однако, при реализации данного функционала возникли трудности с маршрутизацией. Конфигурация маршрутов, использующая JSON, не работала должным образом. В результате, для временного решения проблемы пришлось использовать мокированные данные через стор, хотя изначально предполагалось, что маршрутизация будет работать корректно.

Пример конфигурации маршрута, который не сработал:

```json
{
  "/orders-with-item/:itemId": "/orders?items.id=:itemId"
}
```
