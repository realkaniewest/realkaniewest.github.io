# realkaniewest.github.io

Одностраничное портфолио realkaniewest на Vite + React + TypeScript + Tailwind CSS.

## Локальный запуск

```bash
npm install
npm run dev
```

## Проверка прод-сборки

```bash
npm run build
npm run preview
```

## Деплой

GitHub Pages собирается через `.github/workflows/deploy.yml` и публикует папку `dist/` через официальный `actions/deploy-pages`. Для user-site используется `base: "/"` в `vite.config.ts`.

В настройках репозитория Pages должен быть выбран Source: GitHub Actions.
